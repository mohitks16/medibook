const mongoose = require("mongoose");
const Appointment = require("../../../models/ApplicationModels/AppointmentModels/Appointment");
const Slot = require("../../../models/ApplicationModels/DoctorModels/Slot");
const Doctor = require("../../../models/ApplicationModels/DoctorModels/Doctor");
const razorpayInstance = require("../../../config/razorpayConfig");
const Patient = require("../../../models/ApplicationModels/PatientModels/Patient");
const crypto = require("crypto");

// Controller to create and preview an appointment booking
const createOrder = async (req, res) => {
    try {
        // Extract patient ID from the authenticated request

        const patientId = req.patient.patientId;

        // Ensure patient ID is present

        if (!patientId) {
            return res.status(400).json({
                message: "Patient ID is required"
            });
        }

        // Extract slotId from request body

        const { slotId } = req.body;

        // Ensure slot ID is provided

        if (!slotId) {
            return res.status(400).json({
                message: "Slot ID is required"
            });
        }

        // Validate if slot ID is a valid MongoDB ObjectId

        if (!mongoose.Types.ObjectId.isValid(slotId)) {
            return res.status(400).json({
                message: "Invalid slot ID"
            });
        }


        // Find the slot by ID in the database
        const slot = await Slot.findById(slotId);


        // If slot does not exist, return 404
        if (!slot) {
            return res.status(404).json({
                message: "Slot not found"
            });
        }

        // Check if the slot date is in the past
        const todayStr = new Date().toISOString().split("T")[0];
        if (slot.date < todayStr) {
            return res.status(400).json({
                message: "Cannot book past slots"
            });
        }

        // Find the doctor associated with this slot
        const doctor = await Doctor.findById(slot.doctor);

        // If doctor data is missing for the slot, return 500 error
        if (!doctor) {
            return res.status(500).json({
                message: "Doctor data missing for this slot"
            });
        }

        // Compute consultation fee, platform fee (10%), and doctor earning

        const consultationFee = doctor.consultationFee || 0;
        const platformFee = Math.round(consultationFee * 0.10);
        const doctorEarning = consultationFee - platformFee;

        //  Create Razorpay order first (money must succeed before we commit anything)
        const amountInPaise = Math.round(consultationFee * 100);
        const receipt = `appt_${Date.now()}_${String(patientId).slice(-6)}`;

        let razorpayOrder;
        try {
            razorpayOrder = await razorpayInstance.orders.create({
                amount: amountInPaise,
                currency: "INR",
                receipt,
                notes: {
                    patientId: String(patientId),
                    slotId: String(slotId),
                    doctorId: String(doctor._id),
                },
            });
        } catch (orderError) {
            console.log("Razorpay order creation failed:", orderError);
            return res.status(500).json({
                message: "Failed to create payment order",
                error: orderError.message,
            });
        }

        // ── 2. Create the pending appointment (paymentStatus unpaid until verify)
        const appointment = await Appointment.create({
            patient: patientId,
            doctor: doctor._id,
            slot: new mongoose.Types.ObjectId(),
            date: slot.date,
            time: slot.time,
            consultationFee,
            platformFee,
            doctorEarning,
            status: "pending",
            paymentStatus: "unpaid",
            razorpayOrderId: razorpayOrder.id,
        });


        // ── 4. Fetch patient for prefill (silent-safe — falls back to empty strings)
        const patient = await Patient.findById(patientId).select("fullName email phoneNumber");

        res.status(201).json({
            message: "Order created",
            orderId: razorpayOrder.id,
            amount: amountInPaise,
            currency: "INR",
            appointmentId: appointment._id,
            key: process.env.RAZORPAY_KEY_ID,
            prefill: {
                name: patient?.fullName || "",
                email: patient?.email || "",
                contact: patient?.phoneNumber || "",
            },
        });

    }
    catch (error) {
        // Log error and return 500 server error response
        console.log(error);
        return res.status(500).json({
            message: "Failed to create appointment",
            error: error.message
        });
    }
};


const getSlotById = async (req, res) => {
    try {
        const { slotId } = req.params;

        const patientId = req.patient.patientId;

        if (!patientId) {
            return res.status(400).json({
                message: "Patient ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(slotId)) {
            return res.status(400).json({ message: "Invalid slot ID" });
        }

        // console.log("slotId" , slotId)

        const slot = await Slot.findById(slotId);

        // console.log("slot" , slot)

        if (!slot) {

            return res.status(404).json({ message: "Slot not found" });

        }

        return res.status(200).json({ message: "Slot fetched", slot });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to fetch slot", error: error.message });
    }
}

const verifyPayment = async (req, res) => {
    try {
        // ── 1. Patient identity
        const patientId = req.patient.patientId;
        if (!patientId) {
            return res.status(400).json({ message: "Patient ID is required" });
        }

        // ── 2. Body validation
        const {
            appointmentId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            slot_id,

        } = req.body;

        // console.log("slot id is " ,slot_id )

        


        if (!appointmentId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // ──  Find appointment
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

         

        // ──  Ownership — patient can only verify their own appointment
        if (appointment.patient.toString() !== patientId.toString()) {
            return res.status(403).json({ message: "Forbidden" });
        }

        // ──  Order ID must match what we stored at create-order time
        if (appointment.razorpayOrderId !== razorpay_order_id) {
            return res.status(400).json({ message: "Order ID mismatch" });
        }

        // ──  Idempotency — don't allow double-verify
        if (appointment.paymentStatus === "paid") {
            return res.status(400).json({ message: "Appointment already paid" });
        }



        // ──  HMAC signature verification
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid payment signature" });
        }

        const slot = await Slot.findById(slot_id);
        

        // appointmentId

        slot.isBooked = true;
        slot.bookedBy = patientId;
        slot.appointment = appointment._id;
        await slot.save();

        // ── 8. Flip appointment to confirmed/paid

        appointment.slot = slot_id ;
        appointment.status = "confirmed";
        appointment.paymentStatus = "paid";
        appointment.paymentId = razorpay_payment_id;
        await appointment.save();

       

        // ── 9. Success response
        res.status(200).json({
            message: "Payment verified successfully",
            appointment,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to verify payment",
            error: error.message,
        });
    }
};

module.exports = {
    createOrder,
    getSlotById,
    verifyPayment
};

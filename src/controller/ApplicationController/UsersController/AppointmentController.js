const mongoose = require("mongoose");
const Appointment = require("../../../models/ApplicationModels/AppointmentModels/Appointment");
const Slot = require("../../../models/ApplicationModels/DoctorModels/Slot");
const Doctor = require("../../../models/ApplicationModels/DoctorModels/Doctor");

// Controller to create and preview an appointment booking
const createAppointment = async (req, res) => {
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

        // Check if the slot is already booked
        if (slot.isBooked) {
            return res.status(409).json({
                message: "Slot already booked"
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

        // Return booking preview response (no DB write in this step)
        const appointment = await Appointment.create({
            patient: patientId,
            doctor: doctor._id,
            slot: slot._id,
            date: slot.date,
            time: slot.time,
            consultationFee,
            platformFee,
            doctorEarning,
            status: "confirmed",
            paymentStatus: "paid",
        });

        slot.isBooked = true;
        slot.bookedBy = patientId;
        slot.appointment = appointment._id;
        await slot.save();

        res.status(201).json({
            message: "Appointment booked successfully",
            appointment,
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

        if (!slot)  {

            return res.status(404).json({ message: "Slot not found" });

            }

        return res.status(200).json({ message: "Slot fetched", slot });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to fetch slot", error: error.message });
    }
}


module.exports = {
    createAppointment,
    getSlotById
};

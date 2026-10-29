const mongoose = require("mongoose");

// Define the appointment schema with timestamps for tracking creation and updates
const appointmentSchema = new mongoose.Schema(
    {
        // Reference to the Patient who booked the appointment
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },

        // Reference to the Doctor with whom the appointment is booked
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },

        // Reference to the specific Slot booked for this appointment (unique to ensure one appointment per slot)
        slot: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Slot",
            required: true,
        },

        // Date of the appointment copied from the slot ("YYYY-MM-DD")

        date: {
            type: String,
            required: true,
        },

        // Time of the appointment copied from the slot ("10:00 AM")

        time: {
            type: String,
            required: true,
        },

        // Consultation fee charged by the doctor

        consultationFee: {
            type: Number,
            required: true,
        },

        // Platform fee charged for the service
        platformFee: {
            type: Number,
            required: true,
        },

        // Total earnings for the doctor (consultation fee or net amount)
        doctorEarning: {
            type: Number,
            required: true,
        },

        // Status of the appointment lifecycle
        status: {
            type: String,
            enum: ["pending", "confirmed", "completed", "cancelled"],
            default: "pending",
        },

        // Payment status of the appointment
        paymentStatus: {
            type: String,
            enum: ["unpaid", "paid", "refunded"],
            default: "unpaid",
        },

        // Payment gateway transaction ID (reserved for payment module)
        paymentId: {
            type: String,
            default: "",
        },
        razorpayOrderId: {
            type: String, 
            default: "",
        }
    },
    {
        timestamps: true,
    }
);


// Create and export the Appointment model
const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;

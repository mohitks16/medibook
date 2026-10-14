const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
    {   

        doctor: { // Reference to the Doctor model
            type: mongoose.Schema.Types.ObjectId,// This will store the ID of the doctor who owns this slot
            ref: "Doctor", // The 'ref' property specifies the model to which the ObjectId refers
            required: true,
        },

        date: {
            type: String,  // "2025-10-15"
            required: true,
        },

        time: {
            type: String,  // "10:00 AM"
            required: true,
        },

        isBooked: {
            type: Boolean,
            default: false,
        },

        bookedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            default: null,
        },

        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            default: null,
        },
        
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate slots for same doctor + date + time
slotSchema.index({ doctor: 1, date: 1, time: 1 }, { unique: true });

const Slot = mongoose.model("Slot", slotSchema);

module.exports = Slot;
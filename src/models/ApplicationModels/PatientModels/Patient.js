const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        phoneNumber: {
            type: String,
            required: true,
        },

        dateOfBirth: {
            type: Date,
        },

        gender: {
            type: String,
            enum: ["male", "female", "other" , ""],
            default: "",
        },

        address: {
            type: String,
            default: "",
        },

        profilePicture: {
            type: String,
            default: "",
        },

        // Blood group of the patient (optional, no default so validation allows undefined when not set)
        bloodGroup: {
            type: String,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        },

        // Freeform text containing any patient allergies
        allergies: {
            type: String,
            default: "",
        },

        // Freeform text containing patient medical history
        medicalHistory: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
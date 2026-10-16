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
    },
    {
        timestamps: true,
    }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        phoneNumber: {
            type: String,
            required: true,
        },

        username: {
            type: String,
            required: true,
            unique: true,
        },

        doctorId: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        yearsOfExperience: {
            type: Number,
            required: true,
        },

        specialization: {
            type: String,
            required: true,
        },

        currentlyWorkingAt: {
            type: String,
            required: true,
        },

        degree: {
            type: String,
            required: true,
        },

        credentialDocument: {
            type: String,
            required: true,
        },

        consultationFee: {
            type: Number,
            default: 0,
        },

        professionalBio: {
            type: String,
            default: "",
        },

        consultationAddress: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
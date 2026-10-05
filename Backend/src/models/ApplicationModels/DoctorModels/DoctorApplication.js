const mongoose = require("mongoose");

const doctorApplicationSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        phoneNumber: {
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

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const DoctorApplication = mongoose.model(
    "DoctorApplication",
    doctorApplicationSchema
);

module.exports = DoctorApplication;
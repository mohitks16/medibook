const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        identifier: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        channel: {
            type: String,
            enum: ["email", "phone"],
            required: true,
        },

        otp: {
            type: String,
            required: true,
        },

        purpose: {
            type: String,
            enum: ["signup", "login"],
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        attempts: {
            type: Number,
            default: 0,
        },

        verified: {
            type: Boolean,
            default: false,
        },

        tempFullName: {
            type: String,
        },

        tempPhoneNumber: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OtpVerification = mongoose.model("OtpVerification", otpSchema);

module.exports = OtpVerification;
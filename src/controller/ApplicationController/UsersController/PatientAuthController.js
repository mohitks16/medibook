const Patient = require("../../../models/ApplicationModels/PatientModels/Patient");
const OtpVerification = require("../../../models/ApplicationModels/PatientModels/OtpVerification");
const { generateOtp, getOtpExpiry } = require("../../../config/otpUtils");
// const { sendOtpEmail } = require("../../../services/ResendemailService");

const jwt = require("jsonwebtoken");
const { sendOtpEmail } = require("../../../services/stmpEmailService");
require("dotenv").config();


const requestSignupOtp = async (req, res) => {
    try {

        console.log("[OTP] Request received");

        const { fullName, email, phoneNumber } = req.body;

        console.log("[OTP] Patient lookup completed");

        if (!fullName || !email || !phoneNumber) {
            return res.status(400).json({
                message: "Full name, email and phone number are required",
            });
        }

        

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
            });
        }

        if (phoneNumber.length < 10) {
            return res.status(400).json({
                message: "Phone number must be at least 10 digits",
            });
        }

        const existingPatient = await Patient.findOne({ email });

        console.log("[OTP] Patient lookup completed");

        if (existingPatient) {
            return res.status(409).json({
                message: "Email already registered, please login",
            });
        }

        const otp = generateOtp();
        const expiresAt = getOtpExpiry();

        console.log("[OTP] OTP generated");

        // Delete any existing OTP verification records for the same email and purpose (signup)
        // This is to prevent duplicate OTP verification records from being created
        await OtpVerification.deleteMany({
            identifier: email,
            purpose: "signup",
        });

        console.log("[OTP] Previous OTPs deleted");

        await OtpVerification.create({
            identifier: email,
            channel: "email",
            otp,
            purpose: "signup",
            expiresAt,
            tempFullName: fullName,
            tempPhoneNumber: phoneNumber,
        });

        await sendOtpEmail(email, otp, "signup");


        res.status(200).json({
            message: "OTP sent to your email",
        });
    } catch (error) {
        console.error("[OTP] ERROR:", error);
        
        res.status(500).json({
            
            message: "Failed to send signup OTP",
            error: error.message,
        });
    }
};

const verifySignupOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required",
            });
        }

        const otpRecord = await OtpVerification.findOne({
            identifier: email,
            purpose: "signup",
            verified: false,
        }) ; 

        if (!otpRecord) {
            return res.status(400).json({
                message: "No pending signup found, please request a new OTP",
            });
        }

        if (Date.now() > otpRecord.expiresAt.getTime()) {
            return res.status(400).json({
                message: "OTP expired, please request a new one",
            });
        }

        if (otpRecord.otp !== otp) {
            otpRecord.attempts += 1;
            await otpRecord.save();

            return res.status(400).json({
                message: "Invalid OTP",
            });
        }

        otpRecord.verified = true;
        await otpRecord.save();

        const patient = await Patient.create({
            fullName: otpRecord.tempFullName,
            email: otpRecord.identifier,
            phoneNumber: otpRecord.tempPhoneNumber,
        });

        const token = jwt.sign(
            {
                patientId: patient._id,
                role: "patient",
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(201).json({
            message: "Signup verified successfully",
            token,
            patient: {
                id: patient._id,
                fullName: patient.fullName,
                email: patient.email,
                phoneNumber: patient.phoneNumber,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to verify signup OTP",
            error: error.message,
        });
    }
};

const requestLoginOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
            });
        }

        const patient = await Patient.findOne({ email });

        if (!patient) {
            return res.status(404).json({
                message: "No account found, please sign up",
            });
        }

        const otp = generateOtp();
        const expiresAt = getOtpExpiry();

        await OtpVerification.deleteMany({
            identifier: email,
            purpose: "login",
        });

        await OtpVerification.create({
            identifier: email,
            channel: "email",
            otp,
            purpose: "login",
            expiresAt,
        });

        await sendOtpEmail(email, otp, "login");

        res.status(200).json({
            message: "OTP sent to your email",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to send login OTP",
            error: error.message,
        });
    }
};

const verifyLoginOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required",
            });
        }

        const otpRecord = await OtpVerification.findOne({
            identifier: email,
            purpose: "login",
            verified: false,
        }).sort({ createdAt: -1 });

        if (!otpRecord) {
            return res.status(400).json({
                message: "No pending login found, please request a new OTP",
            });
        }

        if (Date.now() > otpRecord.expiresAt.getTime()) {
            return res.status(400).json({
                message: "OTP expired, please request a new one",
            });
        }

        if (otpRecord.otp !== otp) {
            otpRecord.attempts += 1;
            await otpRecord.save();

            return res.status(400).json({
                message: "Invalid OTP",
            });
        }

        otpRecord.verified = true;
        await otpRecord.save();

        const patient = await Patient.findOne({ email });

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found",
            });
        }

        const token = jwt.sign(
            {
                patientId: patient._id,
                role: "patient",
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            patient: {
                id: patient._id,
                fullName: patient.fullName,
                email: patient.email,
                phoneNumber: patient.phoneNumber,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to verify login OTP",
            error: error.message,
        });
    }
};

module.exports = {
    requestSignupOtp,
    verifySignupOtp,
    requestLoginOtp,
    verifyLoginOtp
};
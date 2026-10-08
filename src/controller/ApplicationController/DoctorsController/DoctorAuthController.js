const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Doctor = require("../../../models/ApplicationModels/DoctorModels/Doctor");


const doctorLogin = async (req, res) => {
    try {
        const { username, doctorId, password } = req.body;

        if (!username || !doctorId || !password) {
            return res.status(400).json({
                message: "Username, Doctor ID and password are required",
            });
        }

        const doctor = await Doctor.findOne({
            username,
            doctorId,
        });

        if (!doctor) {
            return res.status(401).json({
                message: "Invalid username or Doctor ID",
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            doctor.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid password",
            });
        }

        const token = jwt.sign(
            {
                doctorId: doctor._id,
                role: "doctor",
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            message: "Doctor login successful",
            token,
            doctor: {
                id: doctor._id,
                fullName: doctor.fullName,
                username: doctor.username,
                doctorId: doctor.doctorId,
                specialization: doctor.specialization,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Doctor login failed",
            error: error.message,
        });
    }
};

module.exports = {
    doctorLogin,
};
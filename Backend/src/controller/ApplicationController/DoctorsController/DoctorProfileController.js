const Doctor = require("../../../models/ApplicationModels/DoctorModels/Doctor");

const getDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.doctor.doctorId)
            .select("-password");

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor profile not found",
            });
        }

        res.status(200).json({
            message: "Doctor profile fetched successfully",
            doctor,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch doctor profile",
            error: error.message,
        });
    }
};

module.exports = {
    getDoctorProfile,
};
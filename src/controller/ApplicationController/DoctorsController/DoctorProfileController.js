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

const updateDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.doctor.doctorId);

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor profile not found",
            });
        }

        doctor.fullName = req.body.fullName ?? doctor.fullName;
        doctor.specialization = req.body.specialization ?? doctor.specialization;
        doctor.consultationFee = req.body.consultationFee ?? doctor.consultationFee ;
        doctor.currentlyWorkingAt = req.body.currentlyWorkingAt ?? doctor.currentlyWorkingAt;
        doctor.professionalBio = req.body.professionalBio ;

        await doctor.save();

        res.status(200).json({
            message: "Doctor profile updated successfully",
            data : doctor,
        });

    
    } catch (error) {
        res.status(500).json({
            message: "Failed to update doctor profile",
            error: error.message,
        });
    }
};

module.exports = {
    getDoctorProfile,
    updateDoctorProfile
};
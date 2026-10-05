const DoctorApplication = require("../../../models/ApplicationModels/DoctorModels/DoctorApplication");

const submitDoctorApplication = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phoneNumber,
            yearsOfExperience,
            specialization,
            currentlyWorkingAt,
            degree,
        } = req.body;

        const credentialDocument = req.file
            ? req.file.path
            : null;

        const doctorApplication = await DoctorApplication.create({
            fullName,
            email,
            phoneNumber,
            yearsOfExperience,
            specialization,
            currentlyWorkingAt,
            degree,
            credentialDocument,
        });

        res.status(201).json({
            message: "Doctor application submitted successfully",
            application: doctorApplication,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to submit doctor application",
            error: error.message,
        });
    }
};

module.exports = {
    submitDoctorApplication,
};
const DoctorApplication = require("../../models/ApplicationModels/DoctorModels/DoctorApplication");
const Doctor = require("../../models/ApplicationModels/DoctorModels/Doctor");
const bcrypt = require("bcryptjs");
const { generateUsername, generateDoctorId, generatePassword } = require("../../config/doctorCredentials");

const getDoctorApplications = async (req, res) => {
    try {
        const applications = await DoctorApplication.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Doctor applications fetched successfully",
            applications,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch doctor applications",
            error: error.message,
        });
    }
};


const approveDoctorApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;

        const application = await DoctorApplication.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                message: "Doctor application not found",
            });
        }

        if (application.status !== "pending") {
            return res.status(400).json({
                message: "This application has already been processed",
            });
        }

        const username = generateUsername(application.fullName);
        const doctorId = generateDoctorId();
        const password = generatePassword();
        const hashedPassword = await bcrypt.hash(password, 10);

        const doctor = await Doctor.create({
            fullName: application.fullName,
            email: application.email,
            phoneNumber: application.phoneNumber,

            // temporary values for now
            username: username,
            doctorId: doctorId,
            password: hashedPassword,

            yearsOfExperience: application.yearsOfExperience,
            specialization: application.specialization,
            currentlyWorkingAt: application.currentlyWorkingAt,
            degree: application.degree,
            credentialDocument: application.credentialDocument,
        });

        application.status = "approved";
        await application.save();

        res.status(201).json({
            message: "Doctor application approved successfully",
            Credentials:{
                Username:username , 
                DoctorId:doctorId , 
                password:password
            },
            doctor,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to approve doctor application",
            error: error.message,
        });
    }
};

module.exports = {
    getDoctorApplications,
    approveDoctorApplication,
};


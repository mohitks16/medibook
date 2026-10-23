const mongoose = require("mongoose");
const Doctor = require("../../../models/ApplicationModels/DoctorModels/Doctor")
const Slot = require("../../../models/ApplicationModels/DoctorModels/Slot");



const getAllDoctors = async (req, res) => {
    try{

        // Check if the logged-in user has the 'patient' role
        if(req.patient.role !== "patient"){
            return res.status(403).json({
                message: "Patient access required"
            })
        }

        const patientId = req.patient.patientId ;

        // Ensure patient ID is present in the request
        if(!patientId){
            return res.status(400).json({
                message: "Patient ID is required"
            })
        }

        // Extract query parameters for name, specialization, and availability filtering
        const { name, specialization, available } = req.query;

        // Initialize an empty filter object for querying doctors
        const filter = {};

        // If a name query parameter is provided, validate and add regex filter
        if (name) {
            const trimmedName = name.trim();

            // Validate that the trimmed name has at least 2 characters
            if (trimmedName.length < 2) {
                return res.status(400).json({
                    message: "Doctor name search query must be at least 2 characters long"
                });
            }

            // Add case-insensitive partial match for doctor's full name
            filter.fullName = { $regex: trimmedName, $options: "i" };
        }

        // If a specialization query parameter is provided, add exact match filter
        if (specialization) {
            filter.specialization = specialization;
        }

        // If available is requested as true, filter doctors who have unbooked slots today or later
        if (available === "true") {
            // "available" means: has at least one slot that is unbooked AND dated today or later.
            const todayStr = new Date().toISOString().split("T")[0];
            const doctorIds = await Slot.distinct("doctor", { isBooked: false, date: { $gte: todayStr } });
            filter._id = { $in: doctorIds };
        }

        // Fetch doctors based on the constructed filter object, excluding sensitive fields
        const doctors = await Doctor.find(filter).select("-password -credentialDocument")

        // Return the successfully fetched doctors list
        res.status(200).json({
            message: "All doctors fetched successfully",
            doctors
        })
    }
    catch(error){
        // Handle server errors during doctor discovery
        res.status(500).json({
            message: "Failed to fetch doctors",
            error: error.message
        })
    }
}



// Controller to get specific doctor details along with their available unbooked slots
const getDoctorDetail = async (req, res) => {
    try {

        const patientId = req.patient.patientId;

        if (!patientId) {
            return res.status(400).json({
                message: "Patient ID is required"
            });
        }

        // Extract doctorId from request parameters
        const { doctorId } = req.params;

        // Validate if the provided doctorId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({
                message: "Invalid doctor ID"
            });
        }

        // Find the doctor by ID and select specific profile fields for the detail page
        const doctor = await Doctor.findById(doctorId).select("_id fullName specialization yearsOfExperience currentlyWorkingAt degree consultationFee professionalBio consultationAddress");

        // If doctor is not found, return 404 response
        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        // Compute today's date in YYYY-MM-DD format
        const todayStr = new Date().toISOString().split("T")[0];

        // Fetch unbooked slots for this doctor for today or future dates, sorted by date and time
        const slots = await Slot.find({
            doctor: doctorId,
            isBooked: false,
            date: { $gte: todayStr }
        }).sort({ date: 1, time: 1 });

        // Return the doctor details and available slots
        res.status(200).json({
            message: "Doctor detail fetched successfully",
            doctor,
            slots
        });
    }
    catch (error) {
        // Handle server errors during doctor detail fetch
        res.status(500).json({
            message: "Failed to fetch doctor detail",
            error: error.message
        });
    }
}



module.exports = {
    getAllDoctors,
    getDoctorDetail
}

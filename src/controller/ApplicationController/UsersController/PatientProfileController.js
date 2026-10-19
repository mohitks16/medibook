const Patient = require("../../../models/ApplicationModels/PatientModels/Patient");

/**
 * Controller to fetch the authenticated patient's profile details.
 * Retrieves the patient ID from req.patient (set by auth middleware) and queries the database.
 */
const getPatientProfile = async (req, res) => {
    try {
        // Extract patient ID from the authenticated token payload
        const patientId = req.patient.patientId;

        // Find the patient by ID in the database and exclude the __v version field
        const patient = await Patient.findById(patientId);

        // Check if patient profile exists
        if (!patient) {
            return res.status(404).json({
                message: "Patient profile not found",
            });
        }

        // Return successful response with patient profile data
        return res.status(200).json({
            message: "Patient profile fetched successfully",
            patient,
        });
    } catch (error) {
        // Handle any server or database errors
        return res.status(500).json({
            message: "Failed to fetch patient profile",
            error: error.message,
        });
    }
};

/**
 * Controller to update the authenticated patient's profile details.
 * Validates request body fields (fullName, phoneNumber, dateOfBirth, gender, address, bloodGroup, allergies, medicalHistory),
 * updates the patient record in the database, and returns the updated profile.
 */
const updatePatientProfile = async (req, res) => {
    try {


        const patientId = req.patient.patientId;
        const {
            fullName,
            phoneNumber,
            dateOfBirth,
            gender,
            address,
            bloodGroup,
            allergies,
            medicalHistory,
        } = req.body;

        const updateData = {};

        // Validate fullName if provided
        if (fullName !== undefined) {
            if (typeof fullName !== "string" || fullName.trim() === "") {
                return res.status(400).json({
                    message: "Full name must be a non-empty string",
                });
            }
            updateData.fullName = fullName.trim();
        }

        // Validate phoneNumber if provided
        if (phoneNumber !== undefined) {
            if (typeof phoneNumber !== "string" || phoneNumber.trim().length < 10) {
                return res.status(400).json({
                    message: "Phone number must have length >= 10",
                });
            }
            updateData.phoneNumber = phoneNumber.trim();
        }

        if (dateOfBirth !== undefined) {
            if (dateOfBirth === "" || dateOfBirth === null) {
                // Explicitly clear DOB
                updateData.dateOfBirth = null;
            } else {
                const parsedDate = new Date(dateOfBirth);
                if (isNaN(parsedDate.getTime())) {
                    return res.status(400).json({
                        message: "Invalid date format",
                    });
                }
                updateData.dateOfBirth = parsedDate;
            }
        }


        // Validate gender if provided
        if (gender !== undefined) {
            const validGenders = ["male", "female", "other", "", null];

            if (!validGenders.includes(gender)) {
                return res.status(400).json({
                    message: "Gender must be one of [male, female, other] or empty/null",
                });
            }
            updateData.gender = gender === null ? "" : gender;
        }

        // Validate address if provided
        if (address !== undefined) {
            if (typeof address !== "string") {
                return res.status(400).json({
                    message: "Address must be a string",
                });
            }
            updateData.address = address;
        }

        // Validate bloodGroup if provided
        if (bloodGroup !== undefined) {
            const validBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "", null];
            if (!validBloodGroups.includes(bloodGroup)) {
                return res.status(400).json({
                    message: "Blood group must match enum or be empty/null",
                });
            }
            updateData.bloodGroup = bloodGroup === null ? "" : bloodGroup;
        }

        // Validate allergies if provided
        if (allergies !== undefined) {
            if (typeof allergies !== "string") {
                return res.status(400).json({
                    message: "Allergies must be a string",
                });
            }
            updateData.allergies = allergies;
        }

        // Validate medicalHistory if provided
        if (medicalHistory !== undefined) {

            if (typeof medicalHistory !== "string") {

                return res.status(400).json({

                    message: "Medical history must be a string",

                });
            }
            updateData.medicalHistory = medicalHistory;
        }

        // If updateData ends up empty, return 400
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "No valid fields to update",
            });
        }

        console.log("Update Data is ", updateData)


        // Use Patient.findByIdAndUpdate to update profile
        const patient = await Patient.findByIdAndUpdate(
            patientId,
            { $set: updateData },
            { returnDocument: 'after', runValidators: true } // Updated here
        );

        if (!patient) {
            return res.status(404).json({
                message: "Patient profile not found",
            });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            patient,
        });
    } catch (error) {
        console.log("Error is ", error)
        return res.status(500).json({
            message: "Failed to update patient profile",
            error: error.message,
        });
    }
};


const uploadPatientProfilePicture = async (req, res) => {

    try {

        // console.log("api is hitting" , req)

        const patientId = req.patient.patientId;
        const UserProfile = await Patient.findById(patientId);

        if (!UserProfile) {
            return res.status(404).json({
                message: "Patient profile not found",
            });
        }

        const profilePicturepath = req.file ? req.file.path : null

        if (!profilePicturepath) {
            return res.status(400).json({
                message: "Please upload a file",
            });
        }

        UserProfile.profilePicture = profilePicturepath;
        await UserProfile.save();

        res.status(200).json({
            message: "uploaded successfully",
            // patient,
        });
    }

    catch (error) {
        return res.status(500).json({
            message: "Failed to upload profile picture ",
            error: error.message,
        });
    }

}

module.exports = {
    getPatientProfile,
    updatePatientProfile,
    uploadPatientProfilePicture
};

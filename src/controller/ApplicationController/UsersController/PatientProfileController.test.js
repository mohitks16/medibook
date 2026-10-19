// Import the Patient model and the controller functions to test
const Patient = require("../../../models/ApplicationModels/PatientModels/Patient");
const { getPatientProfile, updatePatientProfile } = require("./PatientProfileController");

// Mock the Patient model
jest.mock("../../../models/ApplicationModels/PatientModels/Patient");

describe("PatientProfileController Tests", () => {
    let req;
    let res;

    beforeEach(() => {
        // Clear mock calls before each test
        jest.clearAllMocks();

        // Setup mock request with authenticated patient info
        req = {
            patient: {
                patientId: "patient123",
                role: "patient"
            },
            body: {}
        };

        // Setup mock response object with chainable status and json spies
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

 

    describe("updatePatientProfile", () => {
        it("should return status 400 if fullName is empty", async () => {
            req.body = { fullName: "" };
            await updatePatientProfile(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Full name must be a non-empty string" });
        });

        it("should return status 400 if phoneNumber length is less than 10", async () => {
            req.body = { phoneNumber: "12345" };
            await updatePatientProfile(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Phone number must have length >= 10" });
        });

        it("should return status 400 if gender is invalid", async () => {
            req.body = { gender: "invalid-gender" };
            await updatePatientProfile(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Gender must be one of [male, female, other] or empty/null" });
        });

        it("should return status 400 if bloodGroup is invalid", async () => {
            req.body = { bloodGroup: "Z+" };
            await updatePatientProfile(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Blood group must match enum or be empty/null" });
        });

        

        it("should return status 404 if patient profile is not found on update", async () => {
            req.body = { fullName: "Jane Doe" };

            Patient.findByIdAndUpdate.mockResolvedValue(null);

            await updatePatientProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Patient profile not found" });
        });

        


        it("should return status 500 if database error occurs during update", async () => {
            req.body = { fullName: "Jane Doe" };

            // Mock findByIdAndUpdate to reject directly with the error
            Patient.findByIdAndUpdate.mockRejectedValue(new Error("Update failed"));

            await updatePatientProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Failed to update patient profile",
                error: "Update failed"
            });
        });

    });
});

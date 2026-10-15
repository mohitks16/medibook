const Doctor = require("../../../models/ApplicationModels/DoctorModels/Doctor");
const { getDoctorProfile, updateDoctorProfile } = require("./DoctorProfileController");

// Mock the Doctor Mongoose model
jest.mock("../../../models/ApplicationModels/DoctorModels/Doctor");

describe("DoctorProfileController Tests", () => {
    let req, res;

    beforeEach(() => {
        // Clear all mock history and instances before each test
        jest.clearAllMocks();

        // Initialize request object with default structure
        req = {
            body: {},
            params: {},
            doctor: { doctorId: "5f8d04f3b508d82d68de1234" }
        };

        // Initialize response object with spy functions
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe("getDoctorProfile Tests", () => {
        // Test: Doctor profile not found
        it("should return 404 if doctor profile is not found", async () => {
            // Stub findById to return null for select
            Doctor.findById.mockReturnValue({
                select: jest.fn().mockResolvedValue(null)
            });

            await getDoctorProfile(req, res);

            // Verify findById was called with doctorId from request
            expect(Doctor.findById).toHaveBeenCalledWith(req.doctor.doctorId);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Doctor profile not found"
            });
        });

        // Test: Doctor profile successfully fetched
        it("should return 200 and the doctor profile when found", async () => {
            const mockDoctor = { _id: "5f8d04f3b508d82d68de1234", fullName: "Dr. Smith" };
            // Stub select to resolve with mockDoctor
            Doctor.findById.mockReturnValue({
                select: jest.fn().mockResolvedValue(mockDoctor)
            });

            await getDoctorProfile(req, res);

            expect(Doctor.findById).toHaveBeenCalledWith(req.doctor.doctorId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Doctor profile fetched successfully",
                doctor: mockDoctor
            });
        });

        // Test: Server error handling
        it("should return 500 if an error occurs during fetch", async () => {
            // Stub findById to throw an error
            Doctor.findById.mockReturnValue({
                select: jest.fn().mockRejectedValue(new Error("Database connection error"))
            });

            await getDoctorProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Failed to fetch doctor profile",
                error: "Database connection error"
            });
        });
    });

    describe("updateDoctorProfile Tests", () => {
        // Test: Doctor profile not found for update
        it("should return 404 if doctor profile is not found during update", async () => {
            // Stub findById to return null
            Doctor.findById.mockResolvedValue(null);

            await updateDoctorProfile(req, res);

            expect(Doctor.findById).toHaveBeenCalledWith(req.doctor.doctorId);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Doctor profile not found"
            });
        });

        // Test: Successful update of doctor profile
        it("should successfully update doctor profile and return 200", async () => {
            const mockDoctorInstance = {
                fullName: "Old Name",
                specialization: "Cardiology",
                consultationFee: 500,
                currentlyWorkingAt: "City Hospital",
                professionalBio: "Old Bio",
                save: jest.fn().mockResolvedValue(true)
            };

            // Stub findById to return the mock doctor instance
            Doctor.findById.mockResolvedValue(mockDoctorInstance);

            req.body = {
                fullName: "Dr. John Doe",
                specialization: "Neurology",
                consultationFee: 700,
                currentlyWorkingAt: "Global Clinic",
                professionalBio: "Updated Bio"
            };

            await updateDoctorProfile(req, res);

            expect(Doctor.findById).toHaveBeenCalledWith(req.doctor.doctorId);
            expect(mockDoctorInstance.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Doctor profile updated successfully",
                data: mockDoctorInstance
            });
        });

        // Test: Server error handling during update
        it("should return 500 if an error occurs during update", async () => {
            // Stub findById to throw an error
            Doctor.findById.mockRejectedValue(new Error("Update failed"));

            await updateDoctorProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Failed to update doctor profile",
                error: "Update failed"
            });
        });
    });
});

// Import required database models and helper modules
const Patient = require("../../../models/ApplicationModels/PatientModels/Patient");
const OtpVerification = require("../../../models/ApplicationModels/PatientModels/OtpVerification");
const { generateOtp, getOtpExpiry } = require("../../../config/otpUtils");
const { sendOtpEmail } = require("../../../services/emailService");
const jwt = require("jsonwebtoken");

// Import the controller functions to test
const {
    requestSignupOtp,
    verifySignupOtp,
    requestLoginOtp,
    verifyLoginOtp
} = require("./PatientAuthController");

// Mock external models, utilities, and libraries to keep tests isolated and safe
jest.mock("../../../models/ApplicationModels/PatientModels/Patient");
jest.mock("../../../models/ApplicationModels/PatientModels/OtpVerification");
jest.mock("../../../config/otpUtils");
jest.mock("../../../services/emailService");
jest.mock("jsonwebtoken");

describe("PatientAuthController Tests", () => {
    let req;
    let res;

    beforeEach(() => {
        // Reset all mock function histories before each test run
        jest.clearAllMocks();

        // Ensure a fake JWT secret exists in the test environment
        process.env.JWT_SECRET = "test_jwt_secret_key";

        // Set up clean fake request object
        req = {
            body: {}
        };

        // Set up clean fake response object with chainable status and json spies
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    // =========================================================================
    // 1. requestSignupOtp Tests
    // =========================================================================
    describe("requestSignupOtp Tests", () => {
        it("should return status 400 if required fields are missing", async () => {
            // Provide incomplete body (missing fullName)
            req.body = {
                email: "patient@example.com",
                phoneNumber: "1234567890"
            };

            await requestSignupOtp(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Full name, email and phone number are required"
            });
        });

        it("should return status 400 if email format is invalid", async () => {
            // Provide an invalid email address format
            req.body = {
                fullName: "John Doe",
                email: "invalid-email-address",
                phoneNumber: "1234567890"
            };

            await requestSignupOtp(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Invalid email format"
            });
        });

        it("should return status 400 if phone number has less than 10 digits", async () => {
            // Provide a phone number that is too short
            req.body = {
                fullName: "John Doe",
                email: "patient@example.com",
                phoneNumber: "12345"
            };

            await requestSignupOtp(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Phone number must be at least 10 digits"
            });
        });

        it("should return status 409 if email is already registered", async () => {
            // Provide valid registration input
            req.body = {
                fullName: "John Doe",
                email: "patient@example.com",
                phoneNumber: "1234567890"
            };

            // Simulate that a patient with this email already exists in the database
            Patient.findOne.mockResolvedValue({
                _id: "patient123",
                email: "patient@example.com"
            });

            await requestSignupOtp(req, res);

            expect(Patient.findOne).toHaveBeenCalledWith({ email: "patient@example.com" });
            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({
                message: "Email already registered, please login"
            });
        });

        it("should successfully send signup OTP and return status 200", async () => {
            // Provide valid registration input
            req.body = {
                fullName: "John Doe",
                email: "patient@example.com",
                phoneNumber: "1234567890"
            };

            const mockExpiryDate = new Date("2026-10-16T12:05:00.000Z");

            // Mock database and helper returns for a successful flow
            Patient.findOne.mockResolvedValue(null);
            generateOtp.mockReturnValue("123456");
            getOtpExpiry.mockReturnValue(mockExpiryDate);
            OtpVerification.deleteMany.mockResolvedValue({ deletedCount: 1 });
            OtpVerification.create.mockResolvedValue({});
            sendOtpEmail.mockResolvedValue(true);

            await requestSignupOtp(req, res);

            // Verify old OTP records were cleared
            expect(OtpVerification.deleteMany).toHaveBeenCalledWith({
                identifier: "patient@example.com",
                purpose: "signup"
            });

            // Verify new OTP verification record was created with temporary details
            expect(OtpVerification.create).toHaveBeenCalledWith({
                identifier: "patient@example.com",
                channel: "email",
                otp: "123456",
                purpose: "signup",
                expiresAt: mockExpiryDate,
                tempFullName: "John Doe",
                tempPhoneNumber: "1234567890"
            });

            // Verify the email service was invoked
            expect(sendOtpEmail).toHaveBeenCalledWith("patient@example.com", "123456", "signup");

            // Verify successful response
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "OTP sent to your email"
            });
        });

        it("should return status 500 if an error occurs while requesting signup OTP", async () => {
            req.body = {
                fullName: "John Doe",
                email: "patient@example.com",
                phoneNumber: "1234567890"
            };

            // Simulate unexpected database crash
            Patient.findOne.mockRejectedValue(new Error("Database connection failed"));

            await requestSignupOtp(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Failed to send signup OTP",
                error: "Database connection failed"
            });
        });
    });

    // =========================================================================
    // 2. verifySignupOtp Tests
    // =========================================================================
    describe("verifySignupOtp Tests", () => {
        it("should return status 400 if email or OTP is missing", async () => {
            // Provide body without OTP
            req.body = {
                email: "patient@example.com"
            };

            await verifySignupOtp(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Email and OTP are required"
            });
        });

        it("should return status 400 if no pending signup record is found", async () => {
            req.body = {
                email: "patient@example.com",
                otp: "123456"
            };

            // Simulate no OTP record found
            OtpVerification.findOne.mockResolvedValue(null);

            await verifySignupOtp(req, res);

            expect(OtpVerification.findOne).toHaveBeenCalledWith({
                identifier: "patient@example.com",
                purpose: "signup",
                verified: false
            });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "No pending signup found, please request a new OTP"
            });
        });

        it("should return status 400 if the signup OTP has expired", async () => {
            req.body = {
                email: "patient@example.com",
                otp: "123456"
            };

            // Simulate an OTP record whose expiry is in the past
            const pastDate = new Date(Date.now() - 60000);
            const mockExpiredRecord = {
                identifier: "patient@example.com",
                otp: "123456",
                expiresAt: pastDate
            };

            OtpVerification.findOne.mockResolvedValue(mockExpiredRecord);

            await verifySignupOtp(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "OTP expired, please request a new one"
            });
        });

        it("should increment attempts and return status 400 if OTP is invalid", async () => {
            // Provide incorrect OTP
            req.body = {
                email: "patient@example.com",
                otp: "999999"
            };

            const futureDate = new Date(Date.now() + 60000);
            const mockOtpRecord = {
                identifier: "patient@example.com",
                otp: "123456",
                attempts: 0,
                expiresAt: futureDate,
                save: jest.fn().mockResolvedValue(true)
            };

            OtpVerification.findOne.mockResolvedValue(mockOtpRecord);

            await verifySignupOtp(req, res);

            // Verify attempts were incremented and record saved
            expect(mockOtpRecord.attempts).toBe(1);
            expect(mockOtpRecord.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Invalid OTP"
            });
        });

        it("should verify OTP, create patient, generate token, and return status 201", async () => {
            // Provide correct email and OTP
            req.body = {
                email: "patient@example.com",
                otp: "123456"
            };

            const futureDate = new Date(Date.now() + 60000);
            const mockOtpRecord = {
                identifier: "patient@example.com",
                otp: "123456",
                attempts: 0,
                verified: false,
                expiresAt: futureDate,
                tempFullName: "John Doe",
                tempPhoneNumber: "1234567890",
                save: jest.fn().mockResolvedValue(true)
            };

            const mockCreatedPatient = {
                _id: "patient123",
                fullName: "John Doe",
                email: "patient@example.com",
                phoneNumber: "1234567890"
            };

            OtpVerification.findOne.mockResolvedValue(mockOtpRecord);
            Patient.create.mockResolvedValue(mockCreatedPatient);
            jwt.sign.mockReturnValue("fake_jwt_token_123");

            await verifySignupOtp(req, res);

            // Verify OTP record marked as verified and saved
            expect(mockOtpRecord.verified).toBe(true);
            expect(mockOtpRecord.save).toHaveBeenCalled();

            // Verify new patient created in database
            expect(Patient.create).toHaveBeenCalledWith({
                fullName: "John Doe",
                email: "patient@example.com",
                phoneNumber: "1234567890"
            });

            // Verify JWT token created
            expect(jwt.sign).toHaveBeenCalledWith(
                {
                    patientId: "patient123",
                    role: "patient"
                },
                "test_jwt_secret_key",
                {
                    expiresIn: "1d"
                }
            );

            // Verify response code 201 and payload
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "Signup verified successfully",
                token: "fake_jwt_token_123",
                patient: {
                    id: "patient123",
                    fullName: "John Doe",
                    email: "patient@example.com",
                    phoneNumber: "1234567890"
                }
            });
        });

        it("should return status 500 if an error occurs during signup verification", async () => {
            req.body = {
                email: "patient@example.com",
                otp: "123456"
            };

            OtpVerification.findOne.mockRejectedValue(new Error("Database lookup failed"));

            await verifySignupOtp(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Failed to verify signup OTP",
                error: "Database lookup failed"
            });
        });
    });

    // =========================================================================
    // 3. requestLoginOtp Tests
    // =========================================================================
    describe("requestLoginOtp Tests", () => {
        it("should return status 400 if email is missing", async () => {
            req.body = {};

            await requestLoginOtp(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Email is required"
            });
        });

        it("should return status 400 if email format is invalid", async () => {
            req.body = {
                email: "invalid-email"
            };

            await requestLoginOtp(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Invalid email format"
            });
        });

        it("should return status 404 if no account exists for the email", async () => {
            req.body = {
                email: "notfound@example.com"
            };

            // Simulate patient account does not exist
            Patient.findOne.mockResolvedValue(null);

            await requestLoginOtp(req, res);

            expect(Patient.findOne).toHaveBeenCalledWith({ email: "notfound@example.com" });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "No account found, please sign up"
            });
        });

        it("should successfully send login OTP and return status 200", async () => {
            req.body = {
                email: "patient@example.com"
            };

            const mockExpiryDate = new Date("2026-10-16T12:05:00.000Z");

            // Mock finding existing patient and helper returns
            Patient.findOne.mockResolvedValue({
                _id: "patient123",
                email: "patient@example.com"
            });
            generateOtp.mockReturnValue("654321");
            getOtpExpiry.mockReturnValue(mockExpiryDate);
            OtpVerification.deleteMany.mockResolvedValue({ deletedCount: 1 });
            OtpVerification.create.mockResolvedValue({});
            sendOtpEmail.mockResolvedValue(true);

            await requestLoginOtp(req, res);

            // Verify old login OTP records deleted
            expect(OtpVerification.deleteMany).toHaveBeenCalledWith({
                identifier: "patient@example.com",
                purpose: "login"
            });

            // Verify new OTP record created
            expect(OtpVerification.create).toHaveBeenCalledWith({
                identifier: "patient@example.com",
                channel: "email",
                otp: "654321",
                purpose: "login",
                expiresAt: mockExpiryDate
            });

            // Verify email was sent
            expect(sendOtpEmail).toHaveBeenCalledWith("patient@example.com", "654321", "login");

            // Verify 200 response
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "OTP sent to your email"
            });
        });

        it("should return status 500 if an error occurs while requesting login OTP", async () => {
            req.body = {
                email: "patient@example.com"
            };

            Patient.findOne.mockRejectedValue(new Error("Database error"));

            await requestLoginOtp(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Failed to send login OTP",
                error: "Database error"
            });
        });
    });

    // =========================================================================
    // 4. verifyLoginOtp Tests
    // =========================================================================
    describe("verifyLoginOtp Tests", () => {
        it("should return status 400 if email or OTP is missing", async () => {
            req.body = {
                email: "patient@example.com"
            };

            await verifyLoginOtp(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Email and OTP are required"
            });
        });

        it("should return status 400 if no pending login record is found", async () => {
            req.body = {
                email: "patient@example.com",
                otp: "654321"
            };

            // Simulate sort chain resolving to null
            const mockQuery = {
                sort: jest.fn().mockResolvedValue(null)
            };
            OtpVerification.findOne.mockReturnValue(mockQuery);

            await verifyLoginOtp(req, res);

            expect(OtpVerification.findOne).toHaveBeenCalledWith({
                identifier: "patient@example.com",
                purpose: "login",
                verified: false
            });
            expect(mockQuery.sort).toHaveBeenCalledWith({ createdAt: -1 });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "No pending login found, please request a new OTP"
            });
        });

        it("should return status 400 if the login OTP has expired", async () => {
            req.body = {
                email: "patient@example.com",
                otp: "654321"
            };

            const pastDate = new Date(Date.now() - 60000);
            const mockExpiredRecord = {
                identifier: "patient@example.com",
                otp: "654321",
                expiresAt: pastDate
            };

            const mockQuery = {
                sort: jest.fn().mockResolvedValue(mockExpiredRecord)
            };
            OtpVerification.findOne.mockReturnValue(mockQuery);

            await verifyLoginOtp(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "OTP expired, please request a new one"
            });
        });

        it("should increment attempts and return status 400 if OTP is invalid", async () => {
            // Provide incorrect OTP
            req.body = {
                email: "patient@example.com",
                otp: "000000"
            };

            const futureDate = new Date(Date.now() + 60000);
            const mockOtpRecord = {
                identifier: "patient@example.com",
                otp: "654321",
                attempts: 0,
                expiresAt: futureDate,
                save: jest.fn().mockResolvedValue(true)
            };

            const mockQuery = {
                sort: jest.fn().mockResolvedValue(mockOtpRecord)
            };
            OtpVerification.findOne.mockReturnValue(mockQuery);

            await verifyLoginOtp(req, res);

            expect(mockOtpRecord.attempts).toBe(1);
            expect(mockOtpRecord.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Invalid OTP"
            });
        });

        it("should return status 404 if patient is not found in database", async () => {
            req.body = {
                email: "patient@example.com",
                otp: "654321"
            };

            const futureDate = new Date(Date.now() + 60000);
            const mockOtpRecord = {
                identifier: "patient@example.com",
                otp: "654321",
                attempts: 0,
                verified: false,
                expiresAt: futureDate,
                save: jest.fn().mockResolvedValue(true)
            };

            const mockQuery = {
                sort: jest.fn().mockResolvedValue(mockOtpRecord)
            };
            OtpVerification.findOne.mockReturnValue(mockQuery);

            // Simulate patient record missing in database
            Patient.findOne.mockResolvedValue(null);

            await verifyLoginOtp(req, res);

            expect(mockOtpRecord.verified).toBe(true);
            expect(mockOtpRecord.save).toHaveBeenCalled();
            expect(Patient.findOne).toHaveBeenCalledWith({ email: "patient@example.com" });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Patient not found"
            });
        });

        it("should verify OTP, generate token, and return status 200 with patient details", async () => {
            req.body = {
                email: "patient@example.com",
                otp: "654321"
            };

            const futureDate = new Date(Date.now() + 60000);
            const mockOtpRecord = {
                identifier: "patient@example.com",
                otp: "654321",
                attempts: 0,
                verified: false,
                expiresAt: futureDate,
                save: jest.fn().mockResolvedValue(true)
            };

            const mockPatient = {
                _id: "patient123",
                fullName: "John Doe",
                email: "patient@example.com",
                phoneNumber: "1234567890"
            };

            const mockQuery = {
                sort: jest.fn().mockResolvedValue(mockOtpRecord)
            };
            OtpVerification.findOne.mockReturnValue(mockQuery);
            Patient.findOne.mockResolvedValue(mockPatient);
            jwt.sign.mockReturnValue("fake_jwt_token_456");

            await verifyLoginOtp(req, res);

            // Verify OTP record marked as verified and saved
            expect(mockOtpRecord.verified).toBe(true);
            expect(mockOtpRecord.save).toHaveBeenCalled();

            // Verify patient lookup
            expect(Patient.findOne).toHaveBeenCalledWith({ email: "patient@example.com" });

            // Verify JWT token created
            expect(jwt.sign).toHaveBeenCalledWith(
                {
                    patientId: "patient123",
                    role: "patient"
                },
                "test_jwt_secret_key",
                {
                    expiresIn: "1d"
                }
            );

            // Verify response status 200 and data
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Login successful",
                token: "fake_jwt_token_456",
                patient: {
                    id: "patient123",
                    fullName: "John Doe",
                    email: "patient@example.com",
                    phoneNumber: "1234567890"
                }
            });
        });

        it("should return status 500 if an error occurs during login verification", async () => {
            req.body = {
                email: "patient@example.com",
                otp: "654321"
            };

            const mockQuery = {
                sort: jest.fn().mockRejectedValue(new Error("Database crash"))
            };
            OtpVerification.findOne.mockReturnValue(mockQuery);

            await verifyLoginOtp(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Failed to verify login OTP",
                error: "Database crash"
            });
        });
    });
});

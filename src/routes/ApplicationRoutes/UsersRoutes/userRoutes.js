const express = require("express");
const { requestSignupOtp, verifySignupOtp, requestLoginOtp, verifyLoginOtp } = require("../../../controller/ApplicationController/UsersController/PatientAuthController");
const { getPatientProfile, updatePatientProfile, uploadPatientProfilePicture } = require("../../../controller/ApplicationController/UsersController/PatientProfileController");
const patientAuthMiddleware = require("../../../middleware/patientAuthMiddleware");
const uploadPatientProfilemiddleware = require("../../../middleware/uploadPatientProfileMiddleware");
const { getAllDoctors, getDoctorDetail } = require("../../../controller/ApplicationController/UsersController/DoctorDiscoveryController");
const { getSlotById, createOrder, verifyPayment } = require("../../../controller/ApplicationController/UsersController/AppointmentController");

const PatientRouter = express.Router();

// Pateint Authentication Routes

PatientRouter.post("/signup/request-otp", requestSignupOtp);
PatientRouter.post("/signup/verify-otp", verifySignupOtp);
PatientRouter.post("/login/request-otp", requestLoginOtp);
PatientRouter.post("/login/verify-otp", verifyLoginOtp);

// Patient Profile Routes

PatientRouter.get("/get-profile", patientAuthMiddleware, getPatientProfile);
PatientRouter.patch("/update-profile", patientAuthMiddleware, updatePatientProfile);
PatientRouter.post("/upload-profile-picture", patientAuthMiddleware ,uploadPatientProfilemiddleware.single("profilePicture"),  uploadPatientProfilePicture);

// Doctor Discovery Routes

PatientRouter.get("/get-doctors", patientAuthMiddleware, getAllDoctors);
PatientRouter.get("/get-doctor-detail/:doctorId", patientAuthMiddleware, getDoctorDetail);

// Appointments routes

PatientRouter.post("/appointments/create-order", patientAuthMiddleware, createOrder );
PatientRouter.get("/appointments/get-slot-by-id/:slotId", patientAuthMiddleware, getSlotById);
PatientRouter.post("/appointments/verify-payment", patientAuthMiddleware, verifyPayment);



module.exports = PatientRouter;

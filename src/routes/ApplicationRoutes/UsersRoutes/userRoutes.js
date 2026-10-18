const express = require("express");
const { requestSignupOtp, verifySignupOtp, requestLoginOtp, verifyLoginOtp } = require("../../../controller/ApplicationController/UsersController/PatientAuthController");
const { getPatientProfile, updatePatientProfile } = require("../../../controller/ApplicationController/UsersController/PatientProfileController");
const patientAuthMiddleware = require("../../../middleware/patientAuthMiddleware");

const PatientRouter = express.Router();

PatientRouter.post("/signup/request-otp", requestSignupOtp);
PatientRouter.post("/signup/verify-otp", verifySignupOtp);
PatientRouter.post("/login/request-otp", requestLoginOtp);
PatientRouter.post("/login/verify-otp", verifyLoginOtp);
PatientRouter.get("/get-profile", patientAuthMiddleware, getPatientProfile);
PatientRouter.patch("/update-profile", patientAuthMiddleware, updatePatientProfile);

module.exports = PatientRouter;

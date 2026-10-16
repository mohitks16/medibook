const express = require("express");
const { requestSignupOtp, verifySignupOtp, requestLoginOtp, verifyLoginOtp } = require("../../../controller/ApplicationController/UsersController/PatientAuthController");

const PatientRouter = express.Router();

PatientRouter.post("/signup/request-otp", requestSignupOtp);
PatientRouter.post("/signup/verify-otp", verifySignupOtp);
PatientRouter.post("/login/request-otp", requestLoginOtp);
PatientRouter.post("/login/verify-otp", verifyLoginOtp);

module.exports = PatientRouter;
const express = require("express");
const { submitDoctorApplication } = require("../../../controller/ApplicationController/DoctorsController/DoctorApplicationController");
const upload = require("../../../middleware/uploadMiddleware");
const { doctorLogin } = require("../../../controller/ApplicationController/DoctorsController/DoctorAuthController");
const doctorAuthMiddleware = require("../../../middleware/doctorAuthMiddleware");
const { getDoctorProfile } = require("../../../controller/ApplicationController/DoctorsController/DoctorProfileController");

const DoctorApplicationRouter = express.Router();

DoctorApplicationRouter.post("/apply", upload.single("credentialDocument"), submitDoctorApplication);
DoctorApplicationRouter.post("/login", doctorLogin);

// DoctorApplicationRouter.get("/profile-test", doctorAuthMiddleware, (req, res) => {
//     res.status(200).json({
//         message: "Doctor authentication successful",
//         doctor: req.doctor,
//     });
// }); Testing the middleware using a temporary route and a temporary controller

DoctorApplicationRouter.get(
    "/profile",
    doctorAuthMiddleware,
    getDoctorProfile
);


module.exports = DoctorApplicationRouter;

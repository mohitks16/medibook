const express = require("express") ; 
const { submitDoctorApplication } = require("../../../controller/ApplicationController/DoctorsController/DoctorApplicationController");
const upload = require("../../../middleware/uploadMiddleware");

const DoctorApplicationRouter = express.Router() ; 

DoctorApplicationRouter.post("/apply" , upload.single("credentialDocument"), submitDoctorApplication) ; 

module.exports = DoctorApplicationRouter;
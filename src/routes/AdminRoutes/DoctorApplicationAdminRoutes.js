const { getDoctorApplications, approveDoctorApplication } = require("../../controller/AdminCotroller/DoctorApplicationAdminController");
const express = require("express");

const DoctorApplicationAdminRouter = express.Router();

DoctorApplicationAdminRouter.get(
    "/applications",
    getDoctorApplications
);
DoctorApplicationAdminRouter.patch(
    "/applications/:applicationId/approve" , 
    approveDoctorApplication
)


module.exports = DoctorApplicationAdminRouter;
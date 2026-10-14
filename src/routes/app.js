const express = require("express");

const DoctorApplicationRouter = require("./ApplicationRoutes/DoctorsRoutes/DoctorApplicationRoutes");
const DoctorApplicationAdminRouter = require("./AdminRoutes/DoctorApplicationAdminRoutes");
const doctorRouter = require("./ApplicationRoutes/DoctorsRoutes/doctorRoutes");

const DoctorRouter = express.Router();
const AdminRouter = express.Router();

// All Doctor Routes -->
DoctorRouter.use("/doctorApplication", DoctorApplicationRouter); // catching All doctor routes related to doctor application
DoctorRouter.use("/doctorSlot", doctorRouter); // catching All doctor routes related to doctor slots

// All Admin Routes -->
AdminRouter.use("/AdmindoctorApplication", DoctorApplicationAdminRouter); // catching all admin routes related to doctor applications 

// All Patient Routes --> 



module.exports = {
    DoctorRouter,
    AdminRouter
};
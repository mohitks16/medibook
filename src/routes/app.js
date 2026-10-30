const express = require("express");

const DoctorApplicationRouter = require("./ApplicationRoutes/DoctorsRoutes/DoctorApplicationRoutes");
const DoctorApplicationAdminRouter = require("./AdminRoutes/DoctorApplicationAdminRoutes");
const doctorRouter = require("./ApplicationRoutes/DoctorsRoutes/doctorRoutes");
const PatientRouter = require("./ApplicationRoutes/UsersRoutes/userRoutes");
const doctorAppointmentRouter = require("./AppointmentRoutes/doctorAppointmentRoutes");
const patientAppointmentRouter = require("./AppointmentRoutes/patientAppointmentRoutes");

const DoctorRouter = express.Router();
const AdminRouter = express.Router();
const PatientAppRouter = express.Router() ;
const AppointmentRouter = express.Router();

// All Doctor Routes -->
DoctorRouter.use("/doctorApplication", DoctorApplicationRouter); // catching All doctor routes related to doctor application 
DoctorRouter.use("/doctorSlot", doctorRouter); // catching All doctor routes related to doctor slots

// All Admin Routes -->
AdminRouter.use("/AdmindoctorApplication", DoctorApplicationAdminRouter); // catching all admin routes related to doctor applications

// All Patient Routes -->
PatientAppRouter.use("/patientApplication", PatientRouter);

// All Appointment Routes -->
AppointmentRouter.use("/doctor", doctorAppointmentRouter);
AppointmentRouter.use("/patient", patientAppointmentRouter);


module.exports = {
    DoctorRouter,
    AdminRouter,
    PatientAppRouter,
    AppointmentRouter,
};

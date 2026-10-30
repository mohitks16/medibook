const express = require("express");
const doctorAuthMiddleware = require("../../middleware/doctorAuthMiddleware");
const {
    getDoctorAllAppointments,
    getDoctorPendingAppointments,
    getDoctorDoneAppointments,
} = require("../../controller/ApplicationController/AppointmentListingController");

const doctorAppointmentRouter = express.Router();

doctorAppointmentRouter.get("/all", doctorAuthMiddleware, getDoctorAllAppointments);
doctorAppointmentRouter.get("/pending", doctorAuthMiddleware, getDoctorPendingAppointments);
doctorAppointmentRouter.get("/done", doctorAuthMiddleware, getDoctorDoneAppointments);

module.exports = doctorAppointmentRouter;
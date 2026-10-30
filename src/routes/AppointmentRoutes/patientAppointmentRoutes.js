const express = require("express");
const patientAuthMiddleware = require("../../middleware/patientAuthMiddleware");
const {
    getPatientAllAppointments,
    getPatientUpcomingAppointments,
    getPatientPastAppointments,
} = require("../../controller/ApplicationController/AppointmentListingController");

const patientAppointmentRouter = express.Router();

patientAppointmentRouter.get("/all", patientAuthMiddleware, getPatientAllAppointments);
patientAppointmentRouter.get("/upcoming", patientAuthMiddleware, getPatientUpcomingAppointments);
patientAppointmentRouter.get("/past", patientAuthMiddleware, getPatientPastAppointments);

module.exports = patientAppointmentRouter;
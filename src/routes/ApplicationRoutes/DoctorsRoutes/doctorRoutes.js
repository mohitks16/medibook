const express = require("express");
const { addSlot, getMySlots, deleteSlot } = require("../../../controller/ApplicationController/DoctorsController/DoctorSlotController");
const doctorAuthMiddleware = require("../../../middleware/doctorAuthMiddleware");

const doctorRouter = express.Router();

doctorRouter.post("/add-slots", doctorAuthMiddleware, addSlot);
doctorRouter.get("/get-slots", doctorAuthMiddleware, getMySlots);
doctorRouter.delete("/delete-slots/:slotId", doctorAuthMiddleware, deleteSlot);

module.exports = doctorRouter;
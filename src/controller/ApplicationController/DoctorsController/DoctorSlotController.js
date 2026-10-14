const Slot = require("../../../models/ApplicationModels/DoctorModels/Slot");

// Add new slot
const addSlot = async (req, res) => {
    try {
        const { date, time } = req.body;
        const doctorId = req.doctor.doctorId;

        // Check if slot already exists
        const existingSlot = await Slot.findOne({
            doctor: doctorId,
            date,
            time,
        });

        if (existingSlot) {
            return res.status(400).json({
                message: "Slot already exists for this date and time",
            });
        }

        const slot = await Slot.create({
            doctor: doctorId,
            date,
            time,
        });

        res.status(201).json({
            message: "Slot added successfully",
            slot,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add slot",
            error: error.message,
        });
    }
};

// Get all slots for logged-in doctor
const getMySlots = async (req, res) => {
    try {
        const doctorId = req.doctor.doctorId;

        const slots = await Slot.find({ doctor: doctorId })
            .sort({ date: 1, time: 1 });

        res.status(200).json({
            message: "Slots fetched successfully",
            slots,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch slots",
            error: error.message,
        });
    }
};

// Delete slot (only if not booked)
const deleteSlot = async (req, res) => {
    try {
        const { slotId } = req.params ;
        const doctorId = req.doctor.doctorId ;

        const slot = await Slot.findOne({
            _id: slotId,
            doctor: doctorId,
        });

        if (!slot) {
            return res.status(404).json({
                message: "Slot not found",
            });
        }

        if (slot.isBooked) {
            return res.status(400).json({
                message: "Cannot delete booked slot",
            });
        }

        await Slot.findByIdAndDelete(slotId);

        res.status(200).json({
            message: "Slot deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete slot",
            error: error.message,
        });
    }
};

module.exports = {
    addSlot,
    getMySlots,
    deleteSlot,
};
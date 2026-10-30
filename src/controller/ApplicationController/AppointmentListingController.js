const Appointment = require("../../models/ApplicationModels/AppointmentModels/Appointment");

// All listing endpoints filter by paymentStatus: "paid" — unpaid/pending appointments
// are invisible in dashboards (per spec). All sort by createdAt desc (most recent first).

// Doctor: Get all paid appointments (confirmed, completed, cancelled)
const getDoctorAllAppointments = async (req, res) => {
    try {
        const doctorId = req.doctor.doctorId;
        if (!doctorId) {
            return res.status(400).json({ message: "Doctor ID is required" });
        }

        const appointments = await Appointment.find({
            doctor: doctorId,
            paymentStatus: "paid",
            status: { $in: ["confirmed", "completed", "cancelled"] }
        })
            .populate("patient", "fullName phoneNumber")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Doctor all appointments fetched successfully",
            appointments
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch doctor all appointments",
            error: error.message
        });
    }
};

// Doctor: Get pending (confirmed) paid appointments
const getDoctorPendingAppointments = async (req, res) => {
    try {
        const doctorId = req.doctor.doctorId;
        if (!doctorId) {
            return res.status(400).json({ message: "Doctor ID is required" });
        }

        const appointments = await Appointment.find({
            doctor: doctorId,
            paymentStatus: "paid",
            status: "confirmed"
        })
            .populate("patient", "fullName phoneNumber")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Doctor pending appointments fetched successfully",
            appointments
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch doctor pending appointments",
            error: error.message
        });
    }
};

// Doctor: Get completed (done) paid appointments
const getDoctorDoneAppointments = async (req, res) => {
    try {
        const doctorId = req.doctor.doctorId;
        if (!doctorId) {
            return res.status(400).json({ message: "Doctor ID is required" });
        }

        const appointments = await Appointment.find({
            doctor: doctorId,
            paymentStatus: "paid",
            status: "completed"
        })
            .populate("patient", "fullName phoneNumber")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Doctor done appointments fetched successfully",
            appointments
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch doctor done appointments",
            error: error.message
        });
    }
};

// Patient: Get all paid appointments (confirmed, completed, cancelled)
const getPatientAllAppointments = async (req, res) => {
    try {
        const patientId = req.patient.patientId;
        if (!patientId) {
            return res.status(400).json({ message: "Patient ID is required" });
        }

        const appointments = await Appointment.find({
            patient: patientId,
            paymentStatus: "paid",
            status: { $in: ["confirmed", "completed", "cancelled"] }
        })
            .populate("doctor", "fullName specialization currentlyWorkingAt")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Patient all appointments fetched successfully",
            appointments
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch patient all appointments",
            error: error.message
        });
    }
};

// Patient: Get upcoming (confirmed) paid appointments
const getPatientUpcomingAppointments = async (req, res) => {
    try {
        const patientId = req.patient.patientId;
        if (!patientId) {
            return res.status(400).json({ message: "Patient ID is required" });
        }

        const appointments = await Appointment.find({
            patient: patientId,
            paymentStatus: "paid",
            status: "confirmed"
        })
            .populate("doctor", "fullName specialization currentlyWorkingAt")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Patient upcoming appointments fetched successfully",
            appointments
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch patient upcoming appointments",
            error: error.message
        });
    }
};

// Patient: Get past (completed) paid appointments
const getPatientPastAppointments = async (req, res) => {
    try {
        const patientId = req.patient.patientId;
        if (!patientId) {
            return res.status(400).json({ message: "Patient ID is required" });
        }

        const appointments = await Appointment.find({
            patient: patientId,
            paymentStatus: "paid",
            status: "completed"
        })
            .populate("doctor", "fullName specialization currentlyWorkingAt")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Patient past appointments fetched successfully",
            appointments
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch patient past appointments",
            error: error.message
        });
    }
};


module.exports = {
    getDoctorAllAppointments,
    getDoctorPendingAppointments,
    getDoctorDoneAppointments,
    getPatientAllAppointments,
    getPatientUpcomingAppointments,
    getPatientPastAppointments,
};

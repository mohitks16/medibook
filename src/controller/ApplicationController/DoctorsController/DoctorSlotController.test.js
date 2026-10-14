const Slot = require("../../../models/ApplicationModels/DoctorModels/Slot");
const { addSlot, getMySlots, deleteSlot } = require("./DoctorSlotController");

// Mock the Slot model
jest.mock("../../../models/ApplicationModels/DoctorModels/Slot");

describe("DoctorSlotController Tests", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            body: {},
            params: {},
            doctor: { doctorId: "5f8d04f3b508d82d68de1234" }
        };
        
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe("addSlot Tests", () => {
        it("should return 400 if slot already exists for the doctor, date, and time", async () => {
            req.body = { date: "2026-06-01", time: "10:00 AM" };
            Slot.findOne.mockResolvedValue({ _id: "slot123", date: "2026-06-01", time: "10:00 AM" });

            await addSlot(req, res);

            expect(Slot.findOne).toHaveBeenCalledWith({
                doctor: req.doctor.doctorId,
                date: "2026-06-01",
                time: "10:00 AM"
            });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Slot already exists for this date and time"
            });
        });

        it("should successfully add a slot and return 201", async () => {
            req.body = { date: "2026-06-01", time: "11:00 AM" };
            Slot.findOne.mockResolvedValue(null);
            const createdSlot = { _id: "slot123", doctor: req.doctor.doctorId, date: "2026-06-01", time: "11:00 AM" };
            Slot.create.mockResolvedValue(createdSlot);

            await addSlot(req, res);

            expect(Slot.create).toHaveBeenCalledWith({
                doctor: req.doctor.doctorId,
                date: "2026-06-01",
                time: "11:00 AM"
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "Slot added successfully",
                slot: createdSlot
            });
        });

        it("should return 500 if an error occurs during addSlot", async () => {
            req.body = { date: "2026-06-01", time: "11:00 AM" };
            Slot.findOne.mockRejectedValue(new Error("Database failure"));

            await addSlot(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Failed to add slot",
                error: "Database failure"
            });
        });
    });

    describe("getMySlots Tests", () => {
        it("should fetch all slots for the doctor successfully and return 200", async () => {
            const mockSlots = [
                { _id: "slot1", date: "2026-06-01", time: "10:00 AM" },
                { _id: "slot2", date: "2026-06-01", time: "11:00 AM" }
            ];

            const mockQuery = {
                sort: jest.fn().mockResolvedValue(mockSlots)
            };
            Slot.find.mockReturnValue(mockQuery);

            await getMySlots(req, res);

            expect(Slot.find).toHaveBeenCalledWith({ doctor: req.doctor.doctorId });
            expect(mockQuery.sort).toHaveBeenCalledWith({ date: 1, time: 1 });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Slots fetched successfully",
                slots: mockSlots
            });
        });

        it("should return 500 if an error occurs during getMySlots", async () => {
            Slot.find.mockImplementation(() => {
                throw new Error("Query failed");
            });

            await getMySlots(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Failed to fetch slots",
                error: "Query failed"
            });
        });
    });

    describe("deleteSlot Tests", () => {
        it("should return 404 if slot is not found", async () => {
            req.params.slotId = "nonexistentSlot";
            Slot.findOne.mockResolvedValue(null);

            await deleteSlot(req, res);

            expect(Slot.findOne).toHaveBeenCalledWith({
                _id: "nonexistentSlot",
                doctor: req.doctor.doctorId
            });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Slot not found"
            });
        });

        it("should return 400 if slot is already booked", async () => {
            req.params.slotId = "bookedSlot123";
            const mockSlot = { _id: "bookedSlot123", isBooked: true };
            Slot.findOne.mockResolvedValue(mockSlot);

            await deleteSlot(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Cannot delete booked slot"
            });
            expect(Slot.findByIdAndDelete).not.toHaveBeenCalled();
        });

        it("should successfully delete slot and return 200 if slot exists and is not booked", async () => {
            req.params.slotId = "slot123";
            const mockSlot = { _id: "slot123", isBooked: false };
            Slot.findOne.mockResolvedValue(mockSlot);
            Slot.findByIdAndDelete.mockResolvedValue(mockSlot);

            await deleteSlot(req, res);

            expect(Slot.findByIdAndDelete).toHaveBeenCalledWith("slot123");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Slot deleted successfully"
            });
        });

        it("should return 500 if an error occurs during deleteSlot", async () => {
            req.params.slotId = "slot123";
            Slot.findOne.mockRejectedValue(new Error("Delete failed"));

            await deleteSlot(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Failed to delete slot",
                error: "Delete failed"
            });
        });
    });
});

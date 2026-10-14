// const { doctorLogin } = require("./doctorController"); // 💡 Update this path to your controller file
const Doctor = require("../../../models/ApplicationModels/DoctorModels/Doctor");
const { doctorLogin } = require("./DoctorAuthController");
 
// ⚡ Tell Jest to fake the Database Model so it doesn't talk to real MongoDB
jest.mock("../../../models/ApplicationModels/DoctorModels/Doctor");

describe("Doctor Login Tests ", () => {
    let req, res;

    // ⚡ This sets up clean, fake req and res objects before every single test
    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(), // Lets us track res.status()
            json: jest.fn()                    // Lets us track res.json()
        };
    });

    // Test 1: Checking missing data input
    it("Test 1: Should stop user if password field is missing", async () => {
        // 1. Give incomplete data
        req.body = { username: "dr_smith", doctorId: "DOC123" }; 

        // 2. Run the controller function
        await doctorLogin(req, res);

        // 3. Expect it to catch the error and send status 400
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Username, Doctor ID and password are required"
        });
    });

    // Test 2: Checking database empty results
    it("Test 2: Should fail login if doctor doesn't exist in database", async () => {
        // 1. Give some data
        req.body = { username: "ghost_user", doctorId: "DOC999", password: "123" };
        
        // 2. Force the database mock to return nothing (null)
        Doctor.findOne.mockResolvedValue(null); 

        // 3. Run the controller
        await doctorLogin(req, res);

        // 4. Expect unauthorized status 401
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: "Invalid username or Doctor ID"
        });
    });

    // Test 3: Checking server/database crash logic
    it("Test 3: Should send 500 error if database suddenly crashes", async () => {
        req.body = { username: "dr_smith", doctorId: "DOC123", password: "123" };
        
        // 2. Force the fake database to instantly throw an unexpected crash error
        Doctor.findOne.mockRejectedValue(new Error("Database connection lost"));

        // 3. Run the controller
        await doctorLogin(req, res);

        // 4. Expect status 500
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).not.toBeNull();
    });
});

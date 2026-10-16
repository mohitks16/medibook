require("dotenv").config();
const { sendOtpEmail } = require("./src/services/emailService");

(async () => {
    try {
        const info = await sendOtpEmail(
            "ffmohit963@gmail.com",
            "123456",
            "signup"
        );
        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.error("Email failed:", error.message);
    }
})();
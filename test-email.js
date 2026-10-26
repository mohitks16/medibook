const resend = require("./src/config/resendConfig");

require("dotenv").config();
// const { sendOtpEmail } = require("./src/services/emailService");

(async () => {
   try {
        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "ffmohit963@gmail.com",
            subject: "Resend Test",
            text: "If you received this, Resend is working!",
        });

        console.log(data);

        res.status(200).json({
            message: "Email sent",
            data,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message,
        });
    }
})();
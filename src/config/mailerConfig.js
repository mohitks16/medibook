const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
});

console.log("[MAILER] Starting SMTP verification");

transporter.verify((error, success) => {
    console.log("[MAILER] Verify callback executed");

    if (error) {
        console.error("[MAILER] VERIFY ERROR:", error);
    } else {
        console.log("[MAILER] SMTP READY");
    }
});

module.exports = transporter;

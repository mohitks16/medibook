const nodemailer = require("nodemailer");

console.log("[MAILER] EMAIL_USER:", process.env.EMAIL_USER);
console.log("[MAILER] EMAIL_PASS_EXISTS:", !!process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

console.log("[MAILER] Starting SMTP verification");

transporter.verify((error, success) => {
    if (error) {
        console.error("[MAILER] VERIFY ERROR:", error);
    } else {
        console.log("[MAILER] SMTP READY");
    }
});

module.exports = transporter;
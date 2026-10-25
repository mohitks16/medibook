const transporter = require("../config/mailerConfig");

const sendOtpEmail = async (to, otp, purpose) => {

    console.log("[MAIL] sendOtpEmail called");
    console.log("[MAIL] Recipient:", to);

    const subject = purpose === "signup"
        ? "MediBook — Verify your email"
        : "MediBook — Your login OTP";

    const text = `Your MediBook OTP is ${otp}. It is valid for 5 minutes. Do not share it with anyone.`;

    console.log("[MAIL] Before transporter.sendMail");

    const info = await transporter.sendMail({
        from: `"MediBook" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
    });

    console.log("[MAIL] After transporter.sendMail");
    console.log("[MAIL] Message ID:", info.messageId);

    return info;
};

module.exports = { sendOtpEmail };
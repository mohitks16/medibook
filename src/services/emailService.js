const transporter = require("../config/mailerConfig");

const sendOtpEmail = async (to, otp, purpose) => {
    const subject = purpose === "signup"
        ? "MediBook — Verify your email"
        : "MediBook — Your login OTP";

    const text = `Your MediBook OTP is ${otp}. It is valid for 5 minutes. Do not share it with anyone.`;

    const info = await transporter.sendMail({
        from: `"MediBook" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
    });

    return info;
};

module.exports = { sendOtpEmail };
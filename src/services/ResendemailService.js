const resend = require("../config/resendConfig");

const sendOtpEmail = async (to, otp, purpose) => {


    const subject = purpose === "signup"
        ? "MediBook — Verify your email"
        : "MediBook — Your login OTP";

    const text = `Your MediBook OTP is ${otp}. It is valid for 5 minutes. Do not share it with anyone.`;

      const result = await resend.emails.send({
        from: "onboarding@resend.dev",
        to,
        subject,
        text,
    });

    return result;
};

module.exports = { sendOtpEmail };
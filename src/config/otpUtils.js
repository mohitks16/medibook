const crypto = require("crypto");

const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString(); 
    // creates a reandom integer between 100000 and 999999
};

const getOtpExpiry = () => {
    const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
    return new Date(Date.now() + FIVE_MINUTES_IN_MS);
};


module.exports = {
    generateOtp,
    getOtpExpiry,
};
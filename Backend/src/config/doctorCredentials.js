const crypto = require("crypto");

const generateDoctorId = () => {
    const randomNumber = crypto.randomInt(100000, 999999);

    return `DOC${randomNumber}`;
};

const generateUsername = (fullName) => {
    const name = fullName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "");

    const randomNumber = crypto.randomInt(1000, 9999);

    return `${name}${randomNumber}`;
};

const generatePassword = () => {
    return crypto.randomBytes(6).toString("hex");
};

module.exports = {
    generateDoctorId,
    generateUsername,
    generatePassword,
};
const { Resend } = require("resend");
require('dotenv').config();

console.log("Resend key is " , process.env.RESEND_API_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = resend;
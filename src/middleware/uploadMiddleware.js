const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "doctor_credentials",
        allowed_formats: ["jpg", "png", "jpeg", "pdf"],
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
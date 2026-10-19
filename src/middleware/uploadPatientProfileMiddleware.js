const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "patient_profiles",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const uploadPatientProfilemiddleware = multer({ storage: storage });

module.exports = uploadPatientProfilemiddleware;
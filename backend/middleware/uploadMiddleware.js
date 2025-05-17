const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

//playerprofile image upload
const playerProfileImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/player"); // Save in "upload/player" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

// File Filter (Optional: Allow only image files)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });
const uploadPlayerProfileImage = multer({ storage: playerProfileImage, fileFilter });

module.exports = {
    upload,
    uploadPlayerProfileImage,
};
const multer = require("multer");
const path = require("path");

// General Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

// Arena-specific Storage
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/arenas"); // Save in "uploads/arenas" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

// File Filter (Allow only image files)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"), false);
    }
};

// Multer upload middlewares
const upload = multer({ storage, fileFilter });
const uploadArenas = multer({ storage: storage2, fileFilter });

// Export both uploaders
module.exports = {
    upload,
    uploadArenas
};

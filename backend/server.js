const express = require("express");
const multer = require("multer");
const cors = require("cors");
const Tesseract = require("tesseract.js"); // ✅ FIXED: Correct import
const path = require("path");
const fs = require("fs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      console.error("❌ Unsupported file type:", file.mimetype);
      return cb(new Error("Only PNG, JPG, and JPEG images are allowed"), false);
    }
    cb(null, true);
  },
});

// API Endpoint for Image Upload & Text Extraction
app.post("/upload", upload.single("image"), async (req, res) => { // ✅ FIXED: Ensure "image" is used
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imagePath = req.file.path;
  console.log("✅ Image received:", imagePath);

  // Perform OCR
  Tesseract.recognize(imagePath, "eng") // ✅ FIXED: Use correct "Tesseract"
    .then(({ data: { text } }) => {
      console.log("✅ Extracted text:", text);
      res.json({ success: true, extractedText: text });
    })
    .catch((err) => {
      console.error("OCR Error:", err.message || err);
      res.status(500).json({ error: "Error extracting text", details: err.message });
    });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

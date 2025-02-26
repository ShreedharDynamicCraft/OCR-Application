const express = require("express");
const multer = require("multer");
const cors = require("cors");
const Tesseract = require("tesseract.js"); // ✅ FIXED: Correct import
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads (memory storage)
const storage = multer.memoryStorage(); // ✅ Store files in memory

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
app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    console.error("❌ No file uploaded.");
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("✅ Image received, processing OCR...");

  try {
    // Perform OCR
    const { data: { text } } = await Tesseract.recognize(req.file.buffer, "eng");

    console.log("✅ Extracted text:", text);
    res.json({ success: true, extractedText: text });

  } catch (err) {
    console.error("❌ OCR Error:", err.message || err);
    res.status(500).json({ error: "Error extracting text", details: err.message });
  }
});

// Start Server

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

module.exports = app; // ✅ Export app for Vercel

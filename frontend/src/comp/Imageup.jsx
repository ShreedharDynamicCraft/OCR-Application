import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

function Imageup({ setExtractedText, setShowImageUploader }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image");
      setTimeout(() => setError(null), 2000);
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    try {
    //   const response = await axios.post(
    //     "http://localhost:5001/upload",


    const response = await axios.post(
        "https://ocr-backend.vercel.app/upload", // ✅ Use your new Vercel backend URL
      
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Response:", response.data);
      setExtractedText(response.data?.extractedText || "No text extracted.");
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      setError("Error processing image. Please try again.");
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 border rounded-lg shadow-xl bg-white w-full max-w-lg text-center relative"
    >
      {/* Close Button */}
      <button
        onClick={() => setShowImageUploader(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-all"
      >
        <AiOutlineClose size={22} />
      </button>

      {/* File Upload Area */}
      <label
        className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-blue-500 rounded-lg cursor-pointer hover:bg-blue-50 transition-all"
      >
        {preview ? (
          <motion.img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <motion.div
            className="flex flex-col items-center text-blue-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaCloudUploadAlt size={50} />
            <p className="text-sm mt-2">Click to upload an image</p>
          </motion.div>
        )}
        <input type="file" className="hidden" onChange={handleChange} />
      </label>

      {/* Upload Button */}
      <motion.button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 shadow-md hover:bg-blue-600 transition-all"
        whileTap={{ scale: 0.9 }}
        disabled={loading}
      >
        {loading ? "Processing..." : "Extract Text"}
      </motion.button>

      {/* Error Message */}
      {error && (
        <motion.h3
          className="text-red-500 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.h3>
      )}
    </motion.div>
  );
}

export default Imageup;

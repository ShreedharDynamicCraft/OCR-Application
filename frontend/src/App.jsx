import { useState } from "react";
import { motion } from "framer-motion";
import ImageUploader from "./comp/Imageup";
import DisplayText from "./comp/Displaytext";

const App = () => {
  const [text, setExtractedText] = useState("");
  const [hovered, setHovered] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-500 to-blue-600 text-white relative">
      {/* Developer Button */}
      <motion.button
        onClick={() => window.open("https://shreedhardynamiccraft.github.io/Shreedhar_Portfolio/", "_blank")}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-900 transition-all"
      >
        {hovered ? "Shreedhar Anand" : "Developer"}
      </motion.button>

      {/* Header Animation */}
      <motion.h1
        className="text-4xl font-extrabold mb-6 bg-white text-transparent bg-clip-text shadow-md"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        AI-Powered OCR Text Extractor
      </motion.h1>

      {/* Show Upload Button Only If No Extracted Text */}
      {!text ? (
        <motion.div
          className="bg-white p-6 rounded-xl shadow-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <ImageUploader setExtractedText={setExtractedText} />
        </motion.div>
      ) : (
        <motion.div
          className="mt-6 w-full max-w-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <DisplayText text={text} />
          <motion.button
            onClick={() => setExtractedText("")}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
            whileTap={{ scale: 0.9 }}
          >
            Upload Another Image
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default App;

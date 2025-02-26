import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaRegCopy, FaCheck } from "react-icons/fa";

function DisplayText({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 border rounded-lg shadow-lg bg-white w-full max-w-lg text-center relative"
    >
      <motion.h3
        className="font-bold text-xl text-blue-600"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Extracted Text
      </motion.h3>

      {text?.trim() ? (
        <motion.p
          className="mt-3 text-gray-800 bg-gray-100 p-3 rounded-lg shadow-sm whitespace-pre-wrap text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {text.trim()}
        </motion.p>
      ) : (
        <motion.p
          className="mt-3 text-red-500 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          No text extracted.
        </motion.p>
      )}

      {/* Copy to Clipboard Button */}
      {text && (
        <motion.button
          onClick={handleCopy}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:bg-blue-600 transition-all"
          whileTap={{ scale: 0.9 }}
        >
          {copied ? <FaCheck size={18} /> : <FaRegCopy size={18} />}
          {copied ? "Copied!" : "Copy Text"}
        </motion.button>
      )}
    </motion.div>
  );
}

export default DisplayText;

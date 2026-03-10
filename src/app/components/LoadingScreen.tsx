import React from 'react';
import { motion } from 'motion/react';

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-base"
    >
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-20 h-20 rounded-full border-4 border-transparent border-t-bronze border-r-bronze-light"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white text-sm whitespace-nowrap"
        >
          Loading...
        </motion.div>
      </div>
    </motion.div>
  );
}

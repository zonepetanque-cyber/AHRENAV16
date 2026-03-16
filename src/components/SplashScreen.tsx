import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2.5 seconds display

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Logo Container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Logo Image */}
        <div className="relative overflow-hidden">
          <img 
            src="https://cdn.shopify.com/s/files/1/0915/3760/4942/files/Logo_application_1.jpg?v=1773408684" 
            alt="AHRENA Logo" 
            className="w-64 h-auto object-contain drop-shadow-2xl"
            onError={(e) => {
              // Fallback if the image is not in the public folder
              e.currentTarget.src = "https://cdn.shopify.com/s/files/1/0915/3760/4942/files/Logo_application_2.jpg?v=1773420195";
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;

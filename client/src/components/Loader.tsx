import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  loading: boolean;
}

const Loader = ({ loading }: LoaderProps) => {
  useEffect(() => {
    // Prevent body scrolling when loader is active
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 w-full h-full bg-white z-[9999] flex justify-center items-center"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 mb-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0.2 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse' }}
                className="absolute w-24 h-24 rounded-full bg-primary-light"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 0.5 }}
                transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse', delay: 0.3 }}
                className="absolute w-16 h-16 rounded-full bg-primary mx-auto mt-4"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse', delay: 0.6 }}
                className="absolute w-8 h-8 rounded-full bg-[#2980b9] mx-auto mt-8"
              />
            </div>
            <h2 className="text-2xl font-medium text-primary">Hariamace</h2>
            <p className="text-sm text-[#555555] mt-2">Premium Natural Water</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from '@/hooks/use-mobile';

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Use motion values for smooth animation
  const width = useMotionValue(0);
  const springWidth = useSpring(width, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const updateScrollProgress = () => {
      if (isMobile) {
        // For mobile: vertical scroll progress
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(scrollPercentage);
        width.set(scrollPercentage);
      } else {
        // For desktop: This will be updated via the event from HorizontalScroll
        const handleProgressUpdate = (e: CustomEvent) => {
          setScrollProgress(e.detail.progress);
          width.set(e.detail.progress);
        };

        window.addEventListener('scrollProgressUpdate', handleProgressUpdate as EventListener);

        return () => {
          window.removeEventListener('scrollProgressUpdate', handleProgressUpdate as EventListener);
        };
      }
    };

    if (isMobile) {
      window.addEventListener('scroll', updateScrollProgress);
      updateScrollProgress(); // Initial call
      
      return () => {
        window.removeEventListener('scroll', updateScrollProgress);
      };
    } else {
      updateScrollProgress();
    }
  }, [isMobile, width]);

  return (
    <>
      {/* Main Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-100 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-secondary"
          style={{ width: springWidth }}
        />
      </div>
      
      {/* Scroll Indicator */}
      <div className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col items-center space-y-2">
          <div className="h-24 w-1.5 bg-gray-200 rounded-full relative">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-primary rounded-full"
              style={{ height: springWidth }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <div className="text-xs text-gray-500 font-medium">
            {Math.round(scrollProgress)}%
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;

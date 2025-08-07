import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { scrollToSection } from '@/lib/utils';

// We'll use standard animations instead of SplitText since it's not available

const HeroSection = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    // Safer GSAP animations
    const animate = () => {
      if (headingRef.current) {
        // Use standard animation
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.5
        });
        
        // Animate each span separately for a similar effect as SplitText
        const spans = Array.from(headingRef.current.querySelectorAll('span'));
        if (spans.length) {
          gsap.from(spans, {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 0.7,
            ease: "power2.out",
            delay: 0.7
          });
        }
      }
    };
    
    // Wait a moment to ensure elements are rendered
    const timer = setTimeout(animate, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="section bg-white relative overflow-hidden flex items-center">
      <div className="container mx-auto px-4 py-16 mt-16 md:mt-0">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <h1 ref={headingRef} className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block">Pure Natural</span>
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Premium Water
              </span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg"
            >
              Experience unparalleled purity with our premium water sourced from the pristine springs of the mountains, delivering essential minerals your body deserves.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <button 
                onClick={() => scrollToSection('about')} 
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-dark px-8 py-3 text-base font-medium text-white shadow-md transition-all hover:shadow-lg hover:-translate-y-1"
              >
                Learn More
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-transparent px-8 py-3 text-base font-medium text-primary shadow-sm transition-all hover:bg-primary hover:text-white hover:-translate-y-1"
              >
                Contact Us
              </button>
            </motion.div>
            
            {/* Stats badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <div className="flex items-center bg-accent px-4 py-2 rounded-full">
                <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                <span className="text-sm font-medium">Zero Plastic</span>
              </div>
              <div className="flex items-center bg-accent px-4 py-2 rounded-full">
                <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                <span className="text-sm font-medium">Essential Minerals</span>
              </div>
              <div className="flex items-center bg-accent px-4 py-2 rounded-full">
                <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                <span className="text-sm font-medium">Pure Taste</span>
              </div>
            </motion.div>
          </div>
          
          <div className="w-full md:w-5/12 relative">
            <div className="relative">
              {/* Background circle */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-accent to-accent-blue" style={{ filter: 'blur(20px)' }}></div>
              
              {/* Floating bottle */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative"
              >
                <img 
                  className="w-full h-auto max-w-md mx-auto rounded-xl animate-float shadow-lg relative z-10"
                  src="https://images.unsplash.com/photo-1564419320461-6870880221ad?w=500&auto=format&fit=crop" 
                  alt="Elemence Premium Water Bottle" 
                />
              </motion.div>
            </div>
            
            {/* Water drop animations */}
            <div className="absolute w-8 h-8 bg-primary/30 rounded-full top-1/4 left-1/4 animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="absolute w-6 h-6 bg-primary/30 rounded-full top-1/3 right-1/3 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute w-10 h-10 bg-primary/30 rounded-full bottom-1/4 right-1/4 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Background gradient */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-accent/50 to-transparent opacity-50" style={{ clipPath: 'ellipse(70% 50% at 60% 30%)' }}></div>
        
        {/* Decorative circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-primary/10 opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full border border-secondary/10 opacity-60"></div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center"
      >
        <span className="text-gray-600 text-sm font-medium mb-2">Scroll</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;

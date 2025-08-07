import React, { useEffect, useRef, ReactNode } from 'react';

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // Parallax speed (default: 0.5)
  direction?: 'up' | 'down' | 'left' | 'right'; // Parallax direction (default: 'up')
  className?: string;
}

const ParallaxEffect: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const initialOffsetY = useRef<number>(0);
  const initialOffsetX = useRef<number>(0);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Save initial position
    const rect = element.getBoundingClientRect();
    initialOffsetY.current = rect.top;
    initialOffsetX.current = rect.left;
    
    const handleScroll = () => {
      if (!element) return;
      
      // Calculate how far the element is from the viewport top
      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const elementTop = rect.top + scrollTop;
      const windowHeight = window.innerHeight;
      
      // Only apply parallax when element is in viewport
      if (
        elementTop < scrollTop + windowHeight &&
        elementTop + rect.height > scrollTop
      ) {
        // Calculate parallax offset
        const scrollPosition = scrollTop + windowHeight - elementTop;
        const scrollPercentage = scrollPosition / (windowHeight + rect.height);
        
        // Apply different transform based on direction
        let transform = '';
        const parallaxValue = scrollPercentage * speed * 100;
        
        switch (direction) {
          case 'up':
            transform = `translate3d(0, ${-parallaxValue}px, 0)`;
            break;
          case 'down':
            transform = `translate3d(0, ${parallaxValue}px, 0)`;
            break;
          case 'left':
            transform = `translate3d(${-parallaxValue}px, 0, 0)`;
            break;
          case 'right':
            transform = `translate3d(${parallaxValue}px, 0, 0)`;
            break;
        }
        
        element.style.transform = transform;
      }
    };
    
    // Initial calculation
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [speed, direction]);
  
  return (
    <div 
      ref={elementRef} 
      className={`parallax-element transition-transform duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default ParallaxEffect;
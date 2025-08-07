import { ReactNode, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface HorizontalScrollProps {
  children: ReactNode;
}

const HorizontalScroll = ({ children }: HorizontalScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [isScrollInitialized, setIsScrollInitialized] = useState(false);

  useEffect(() => {
    const setupSections = () => {
      if (!containerRef.current || !sectionsRef.current) return;
      
      console.log("Setting up horizontal scroll");
      
      try {
        // Clean up any previous ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        
        const sectionElements = Array.from(sectionsRef.current.children) as HTMLElement[];
        
        if (sectionElements.length === 0) {
          console.warn("No sections found");
          return;
        }
        
        // Set each section to be the width of the viewport
        sectionElements.forEach(section => {
          gsap.set(section, { width: window.innerWidth });
        });
        
        // Calculate total width
        const totalWidth = window.innerWidth * sectionElements.length;
        
        // Set the sections container width
        gsap.set(sectionsRef.current, { width: totalWidth });
        
        // Create ScrollTrigger for horizontal scrolling
        const scrollTrigger = ScrollTrigger.create({
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${totalWidth - window.innerWidth}`,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress * 100;
            window.dispatchEvent(new CustomEvent('scrollProgressUpdate', { 
              detail: { progress } 
            }));
          }
        });
        
        // Animate the sections container horizontally
        gsap.to(sectionsRef.current, {
          x: () => -(totalWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: scrollTrigger
        });
        
        // Navigation between sections
        const handleNavigation = (e: Event) => {
          const detail = (e as CustomEvent).detail;
          if (!detail || !detail.sectionId) return;
          
          const sectionId = detail.sectionId;
          const sectionIndex = sectionElements.findIndex(section => section.id === sectionId);
          
          if (sectionIndex !== -1) {
            const targetPosition = sectionIndex * window.innerWidth;
            const scrollAmount = (targetPosition / (totalWidth - window.innerWidth)) * ScrollTrigger.maxScroll(window);
            
            gsap.to(window, {
              scrollTo: { y: scrollAmount },
              duration: 1,
              ease: "power2.inOut"
            });
          }
        };
        
        // Add navigation event listener
        window.addEventListener('scrollToSection', handleNavigation as EventListener);
        
        setIsScrollInitialized(true);
        
        return () => {
          scrollTrigger.kill();
          window.removeEventListener('scrollToSection', handleNavigation as EventListener);
        };
      } catch (error) {
        console.error("Error setting up horizontal scroll:", error);
      }
    };
    
    // Wait a moment to ensure the DOM is fully rendered
    const initTimeout = setTimeout(() => {
      setupSections();
      
      // Handle window resize - recreate the horizontal scroll
      const handleResize = () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        setupSections();
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, 1000);
    
    return () => {
      clearTimeout(initTimeout);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="overflow-hidden w-screen h-screen">
      <div ref={containerRef} className="h-screen">
        <div ref={sectionsRef} className="flex h-full">
          {children}
        </div>
      </div>
      
      {/* Loading indicator */}
      {!isScrollInitialized && (
        <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-gray-600">Loading Elemence experience...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HorizontalScroll;

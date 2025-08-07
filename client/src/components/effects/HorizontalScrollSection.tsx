import { useEffect, useRef, ReactNode, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  speed?: number; // Scroll speed multiplier (default: 1)
}

const HorizontalScrollSection = ({
  children,
  id,
  className = '',
  speed = 1,
}: HorizontalScrollSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Track whether the component is mounted
  const [isMounted, setIsMounted] = useState(false);
  
  // First effect to set mounted state
  useEffect(() => {
    console.log("Setting up horizontal scroll");
    setIsMounted(true);
    
    return () => {
      setIsMounted(false);
    };
  }, []);
  
  // Second effect to handle scrolling logic
  useEffect(() => {
    // Only proceed if the component is mounted
    if (!isMounted) return;
    
    const section = sectionRef.current;
    const container = containerRef.current;
    
    if (!section || !container) return;
    
    // Store ScrollTrigger instances to clean up later
    let activeScrollTriggers: ScrollTrigger[] = [];
    
    // Wait for content to be properly rendered
    const initHorizontalScroll = () => {
      try {
        // First, kill any existing ScrollTriggers for this section
        ScrollTrigger.getAll()
          .filter(trigger => trigger.vars.trigger === section)
          .forEach(trigger => {
            trigger.kill();
          });
        
        // Get all direct children of the container as panels
        const panels = Array.from(container.children) as HTMLElement[];
        
        if (panels.length === 0) {
          console.warn("No panels found in horizontal scroll container");
          return;
        }
        
        // Set section height based on content width
        const totalPanelsWidth = panels.reduce((total, panel) => {
          return total + panel.offsetWidth;
        }, 0);
        
        // Add extra room for spacing
        const extraSpace = window.innerWidth * 0.1;
        const totalScrollDistance = totalPanelsWidth + extraSpace;
        
        // Calculate height needed for scroll
        const heightMultiplier = Math.max(1, speed);
        gsap.set(section, { 
          height: totalScrollDistance * heightMultiplier / speed
        });
        
        // Create a horizontal animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (isMounted) {
                // Dispatch progress event
                const event = new CustomEvent('horizontalScrollProgress', { 
                  detail: { 
                    progress: self.progress,
                    sectionId: id
                  } 
                });
                window.dispatchEvent(event);
              }
            }
          }
        });
        
        // Store the ScrollTrigger instance
        activeScrollTriggers = ScrollTrigger.getAll()
          .filter(trigger => trigger.vars.trigger === section);
        
        // Animate horizontally
        tl.to(container, {
          x: -totalPanelsWidth,
          ease: "none"
        });
      } catch (error) {
        console.error("Error setting up horizontal scroll:", error);
      }
    };
    
    // Wait a moment for DOM to be ready
    const timeoutId = setTimeout(initHorizontalScroll, 1000);
    
    // Clean up function
    return () => {
      clearTimeout(timeoutId);
      
      // Safely kill all associated ScrollTriggers
      if (activeScrollTriggers.length > 0) {
        activeScrollTriggers.forEach(trigger => {
          if (trigger && trigger.kill) {
            trigger.kill();
          }
        });
      } else {
        // Fallback cleanup
        ScrollTrigger.getAll()
          .filter(trigger => trigger.vars.trigger === section)
          .forEach(trigger => {
            if (trigger && trigger.kill) {
              trigger.kill();
            }
          });
      }
    };
  }, [id, speed, isMounted]); // Re-run only when these dependencies change
  
  return (
    <section 
      id={id} 
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
    >
      <div 
        ref={containerRef}
        className="absolute top-0 left-0 h-screen flex flex-nowrap"
      >
        {children}
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
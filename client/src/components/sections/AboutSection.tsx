import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from '@/hooks/use-mobile';
import ParallaxEffect from '@/components/effects/ParallaxEffect';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const setupAnimations = () => {
      // Only proceed if elements exist
      if (!imageRef.current || !contentRef.current || !statsRef.current) return;
      
      try {
        // Image animation
        gsap.from(imageRef.current, {
          x: -50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        });
        
        // Content animation
        gsap.from(contentRef.current, {
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        });
        
        // Stats animation - using Array.from to safely convert children
        const statItems = Array.from(statsRef.current.children);
        if (statItems.length > 0) {
          gsap.from(statItems, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          });
        }
      } catch (error) {
        console.error("Error setting up animations:", error);
      }
    };
    
    // Add a slight delay to ensure refs are populated
    const timeoutId = setTimeout(setupAnimations, 500);
    
    return () => {
      clearTimeout(timeoutId);
      
      // Clean up all scroll triggers related to this component
      const triggers = ScrollTrigger.getAll().filter(st => 
        st.vars.trigger === sectionRef.current || 
        st.vars.trigger === statsRef.current
      );
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section bg-gradient-to-b from-white to-accent/30 relative overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="text-primary font-medium">OUR STORY</span>
              <div className="h-[1px] w-8 bg-primary"></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About Elemence</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our commitment to bringing you the purest natural water since 2005.</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-12 md:mb-0 relative">
            {/* Decorative background elements with parallax effect */}
            <ParallaxEffect speed={0.3} direction="up" className="absolute -top-8 -left-8 z-0">
              <div className="w-16 h-16 rounded-full bg-primary/10"></div>
            </ParallaxEffect>
            <ParallaxEffect speed={0.2} direction="down" className="absolute -bottom-8 -right-8 z-0">
              <div className="w-20 h-20 rounded-full bg-secondary/10"></div>
            </ParallaxEffect>
            
            {/* Main image with subtle parallax */}
            <ParallaxEffect speed={0.15} direction="up" className="relative z-10">
              <div className="relative">
                <img 
                  ref={imageRef}
                  src="https://images.unsplash.com/photo-1534856966153-c86d43d53fe0?w=500&auto=format&fit=crop" 
                  alt="Natural spring water source in mountains" 
                  className="w-full h-auto rounded-2xl shadow-lg border-4 border-white" 
                />
                
                {/* Floating badge with opposite parallax for effect */}
                <ParallaxEffect speed={0.3} direction="down" className="absolute -top-6 -right-6 md:top-auto md:-right-8 md:bottom-12">
                  <div className="bg-white rounded-lg shadow-lg py-3 px-6 flex items-center">
                    <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                    <span className="font-semibold">100% Natural Source</span>
                  </div>
                </ParallaxEffect>
              </div>
            </ParallaxEffect>
          </div>
          
          <div ref={contentRef} className="w-full md:w-1/2 md:pl-16">
            <h3 className="text-2xl font-semibold mb-6 text-primary">Our Premium Story</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Founded in 2005, Elemence was born from a simple mission: to provide the purest, most refreshing water possible. Our source is located deep within protected mountain springs, far away from industrial activity and pollution.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Each drop of Elemence water undergoes a natural filtration process through mineral-rich rock layers, adding essential minerals before we carefully bottle it at the source in our environmentally conscious facility.
            </p>
            
            {/* Feature boxes */}
            <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 rounded-full p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Protected Source</h4>
                  <p className="text-sm text-gray-600">Our water comes from a protected natural spring deep within pristine mountains.</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 rounded-full p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.168 1.168a4 4 0 01-8.092.67L4 10.172a3 3 0 00.879-2.12L6.172 6.172A3 3 0 017 6h2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Natural Filtration</h4>
                  <p className="text-sm text-gray-600">Mineral-rich rock layers naturally filter and enhance our water with essential minerals.</p>
                </div>
              </div>
            </div>
            
            {/* Company stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <h4 className="text-primary text-3xl font-bold mb-1">18+</h4>
                <p className="text-gray-600 text-sm">Years of Excellence</p>
              </div>
              <div className="text-center">
                <h4 className="text-primary text-3xl font-bold mb-1">25+</h4>
                <p className="text-gray-600 text-sm">Countries Served</p>
              </div>
              <div className="text-center">
                <h4 className="text-primary text-3xl font-bold mb-1">100%</h4>
                <p className="text-gray-600 text-sm">Natural Purity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mb-32"></div>
      <div className="absolute left-0 top-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mt-48"></div>
    </section>
  );
};

export default AboutSection;

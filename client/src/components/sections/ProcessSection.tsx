import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-mobile';

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const setupAnimations = () => {
      // Animate timeline line drawing
      if (timelineLineRef.current) {
        gsap.from(timelineLineRef.current, {
          width: 0,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isMobile ? "top 80%" : "left center",
            end: isMobile ? "bottom center" : "right center",
            toggleActions: "play none none reverse"
          }
        });
      }
      
      // Animate process steps
      if (timelineRef.current) {
        gsap.from(timelineRef.current.children, {
          y: 50,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: isMobile ? "top 80%" : "left center",
            end: isMobile ? "bottom center" : "right center",
            toggleActions: "play none none reverse"
          }
        });
      }
    };
    
    // Add a slight delay to ensure refs are populated
    const timeoutId = setTimeout(setupAnimations, 100);
    
    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  return (
    <section id="process" ref={sectionRef} className="section bg-gradient-to-b from-white to-accent/20 relative overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="text-primary font-medium">CRAFTSMANSHIP</span>
              <div className="h-[1px] w-8 bg-primary"></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Process</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From nature to your table: discover how we create the perfect water experience with care and precision.
          </p>
        </div>
        
        {/* Process timeline - Desktop */}
        <div className="hidden md:block relative mb-24">
          {/* Backdrop for timeline */}
          <div className="absolute top-1/2 left-0 w-full h-20 bg-gradient-to-r from-primary/5 via-secondary/10 to-primary/5 transform -translate-y-1/2 rounded-full"></div>
          
          {/* Timeline line */}
          <div 
            ref={timelineLineRef}
            className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary transform -translate-y-1/2 z-10"
          ></div>
          
          {/* Timeline steps */}
          <div ref={timelineRef} className="grid grid-cols-4 gap-8 relative z-20">
            {processSteps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                {/* Step number */}
                <div className="w-24 h-24 mb-6 relative">
                  <div className="absolute inset-0 bg-white rounded-full shadow-lg"></div>
                  <div className="absolute inset-2 bg-gradient-to-br from-primary/10 to-accent rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center">
                      <span className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">{step.number}</span>
                    </div>
                  </div>
                </div>
                
                {/* Step content */}
                <div className={`bg-white rounded-xl shadow-md p-6 ${index % 2 === 0 ? 'translate-y-16' : '-translate-y-16'} w-full max-w-xs`}>
                  <h3 className="text-xl font-bold mb-3 text-primary">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Process cards - Mobile */}
        <div className="md:hidden space-y-8">
          {processSteps.map((step) => (
            <div 
              key={step.number}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-primary">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Content */}
        <div className="mt-24 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <div className="inline-flex items-center px-4 py-2 bg-accent rounded-full text-primary text-sm font-medium mb-6">
                Elemence Quality Guarantee
              </div>
              <h3 className="text-2xl font-bold mb-6">Our Commitment to Excellence</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                At Elemence, our meticulous process is driven by a commitment to delivering water of unparalleled purity and taste. Each step reflects our dedication to quality, sustainability, and your wellness.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">Certified purity exceeding industry standards</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">Sustainable harvesting protecting natural resources</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">Advanced mineral preservation techniques</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 relative">
              <div className="h-64 md:h-full">
                <img 
                  src="https://images.unsplash.com/photo-1561049933-c8fbef47b329?w=500&auto=format&fit=crop" 
                  alt="Quality Testing Lab" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-l"></div>
                <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
                  <div className="text-white space-y-2">
                    <div className="font-bold text-xl">ISO 9001:2015</div>
                    <div className="text-sm text-white/80">Quality Management Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-primary/5 rounded-full"></div>
      <div className="absolute top-40 right-10 w-48 h-48 bg-primary/5 rounded-full"></div>
    </section>
  );
};

export default ProcessSection;

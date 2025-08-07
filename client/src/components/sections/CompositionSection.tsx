import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { minerals } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-mobile';

const CompositionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const visualizationRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const setupAnimations = () => {
      try {
        // Animate mineral cards
        if (cardsRef.current) {
          const cardElements = Array.from(cardsRef.current.children);
          if (cardElements.length > 0) {
            gsap.from(cardElements, {
              opacity: 0,
              y: 50,
              stagger: 0.2,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              }
            });
          }
        }
        
        // Animate water properties section
        if (visualizationRef.current) {
          // Animate the main container
          gsap.from(visualizationRef.current, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: visualizationRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          });
          
          // Get mineral markers as an array
          const markers = Array.from(visualizationRef.current.querySelectorAll('.mineral-marker'));
          
          if (markers.length > 0) {
            // Animate mineral markers with slight float effect
            markers.forEach((marker, index) => {
              gsap.to(marker, {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.5,
              });
            });
          }
        }
      } catch (error) {
        console.error("Error setting up animations:", error);
      }
    };
    
    // Add a longer delay to ensure refs are populated
    const timeoutId = setTimeout(setupAnimations, 500);
    
    return () => {
      clearTimeout(timeoutId);
      // Clean up all scroll triggers related to this component
      const triggers = ScrollTrigger.getAll().filter(st => 
        st.vars.trigger === cardsRef.current || 
        st.vars.trigger === visualizationRef.current ||
        st.vars.trigger === sectionRef.current
      );
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="composition" ref={sectionRef} className="section bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="text-primary font-medium">MINERALS & ELEMENTS</span>
              <div className="h-[1px] w-8 bg-primary"></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Natural Composition</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our water is naturally enhanced with essential minerals that support your health and wellbeing.
          </p>
        </div>
        
        {/* Minerals visualization section */}
        <div className="flex flex-col-reverse md:flex-row items-center mb-16">
          <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pr-12">
            <h3 className="text-2xl font-semibold mb-6 text-primary">Essential Minerals</h3>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Every drop of Elemence water contains a perfect balance of naturally occurring minerals that nourish your body and enhance the clean, refreshing taste.
            </p>
            
            {/* Progress bars for mineral content */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Calcium (Ca)</span>
                  <span className="text-gray-500">42 mg/L</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">Supports bone health and muscle function</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Magnesium (Mg)</span>
                  <span className="text-gray-500">24 mg/L</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">Essential for energy production and nerve function</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Potassium (K)</span>
                  <span className="text-gray-500">1.5 mg/L</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '35%' }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">Vital for heart and kidney function</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Sodium (Na)</span>
                  <span className="text-gray-500">3.5 mg/L</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '20%' }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">Low sodium content for balanced hydration</p>
              </div>
            </div>
          </div>
          
          <div ref={visualizationRef} className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-72 h-72">
              {/* Water drop shape with layers */}
              <div className="absolute w-full h-full rounded-tl-full rounded-tr-full rounded-bl-none rounded-br-full rotate-45 bg-gradient-to-br from-white to-accent shadow-xl"></div>
              
              <div className="absolute w-[90%] h-[90%] top-[5%] left-[5%] rounded-tl-full rounded-tr-full rounded-bl-none rounded-br-full rotate-45 bg-gradient-to-br from-accent to-accent-blue"></div>
              
              <div className="absolute w-[70%] h-[70%] top-[15%] left-[15%] rounded-tl-full rounded-tr-full rounded-bl-none rounded-br-full rotate-45 bg-gradient-to-br from-primary-light/30 to-secondary-light/30"></div>
              
              {/* Floating mineral markers */}
              <div className="mineral-marker absolute top-[20%] left-[70%] w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex flex-col items-center justify-center">
                <span className="text-primary font-bold text-lg">Ca</span>
                <span className="text-xs text-gray-500">Calcium</span>
              </div>
              
              <div className="mineral-marker absolute top-[60%] left-[25%] w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex flex-col items-center justify-center">
                <span className="text-primary font-bold text-lg">Mg</span>
                <span className="text-xs text-gray-500">Magnesium</span>
              </div>
              
              <div className="mineral-marker absolute top-[40%] left-[50%] w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex flex-col items-center justify-center">
                <span className="text-primary font-bold text-md">K</span>
                <span className="text-[10px] text-gray-500">Potassium</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Water properties cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-accent to-white rounded-2xl p-8 shadow-md">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm2.5 5a.5.5 0 01.5.5v.5h1a1 1 0 010 2H7a1 1 0 010-2h1v-.5a.5.5 0 01.5-.5z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">pH Balance</h3>
            <p className="text-gray-600 mb-4">Our water has a perfect pH level between 7.5-8.2, making it slightly alkaline and ideal for daily consumption.</p>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Acidity</span>
              <div className="h-1.5 w-full bg-gray-200 rounded-full">
                <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-red-300 via-yellow-300 to-primary"></div>
              </div>
              <span className="text-sm text-gray-500 ml-2">Alkaline</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-accent rounded-2xl p-8 shadow-md">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Total Dissolved Solids</h3>
            <p className="text-gray-600 mb-4">With a TDS of 150-180 mg/L, our water provides the ideal balance of minerals without compromising purity.</p>
            <div className="bg-white p-3 rounded-lg">
              <div className="flex justify-between">
                <span className="text-xs">0</span>
                <span className="text-xs font-medium text-primary">Elemence Range</span>
                <span className="text-xs">500+</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full mt-1">
                <div className="h-full w-[35%] rounded-full bg-primary relative">
                  <div className="absolute top-[-5px] right-0 w-3 h-3 bg-primary rounded-full"></div>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-xs text-gray-500">TDS (mg/L): 150-180</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-accent-blue to-white rounded-2xl p-8 shadow-md">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Purity Guarantee</h3>
            <p className="text-gray-600 mb-4">Our water is rigorously tested to ensure zero contaminants, additives, or processing chemicals.</p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No chlorine or fluoride
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Zero chemical additives
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Microplastic-free
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full"></div>
      <div className="absolute top-20 right-10 w-40 h-40 bg-primary/5 rounded-full"></div>
      <div className="absolute -bottom-20 right-20 w-60 h-60 bg-primary/5 rounded-full"></div>
    </section>
  );
};

export default CompositionSection;

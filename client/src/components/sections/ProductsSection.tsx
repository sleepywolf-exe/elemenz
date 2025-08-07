import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-mobile';

const ProductsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const setupAnimations = () => {
      // Animate content
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          x: isMobile ? 0 : -100,
          y: isMobile ? 50 : 0,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isMobile ? "top 80%" : "left center",
            end: isMobile ? "bottom center" : "right center",
            toggleActions: "play none none reverse"
          }
        });
        
        // Animate list items with stagger
        const listItems = contentRef.current.querySelectorAll('li');
        gsap.from(listItems, {
          x: -20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: isMobile ? "top 80%" : "left center",
            end: isMobile ? "bottom center" : "right center",
            toggleActions: "play none none reverse"
          }
        });
      }
      
      // Animate image
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          x: isMobile ? 0 : 100,
          y: isMobile ? 50 : 0,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
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
    <section id="products" ref={sectionRef} className="section bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="text-primary font-medium">PREMIUM COLLECTION</span>
              <div className="h-[1px] w-8 bg-primary"></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium water products designed with elegance and sustainability in mind.
          </p>
        </div>
        
        {/* Featured product with spotlight */}
        <div className="mb-24 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/30 rounded-full filter blur-3xl opacity-60 mix-blend-multiply"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl opacity-60 mix-blend-multiply"></div>
          
          <div className="relative bg-gradient-to-r from-white via-accent/10 to-white rounded-3xl shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
            
            <div className="pt-24 pb-16 px-8 md:px-16">
              <div className="flex flex-col md:flex-row items-center">
                <div ref={contentRef} className="w-full md:w-1/2 mb-12 md:mb-0 order-2 md:order-1">
                  <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                    <span className="animate-pulse mr-2">●</span> New Release
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-6">Elemence Signature Collection</h3>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    Our signature glass bottle collection preserves water's natural purity while showcasing its crystal-clear quality. Each bottle is artfully designed with sustainability and elegance in mind for the most discerning water connoisseurs.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-white shadow-sm rounded-xl p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.168 1.168a4 4 0 01-8.092.67L4 10.172a3 3 0 00.879-2.12L6.172 6.172A3 3 0 017 6h2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-semibold">Pure Glass</span>
                      </div>
                      <p className="text-sm text-gray-600">Premium lead-free glass preserves water's natural taste</p>
                    </div>
                    
                    <div className="bg-white shadow-sm rounded-xl p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-semibold">Refillable</span>
                      </div>
                      <p className="text-sm text-gray-600">Designed for multiple uses with easy-clean features</p>
                    </div>
                    
                    <div className="bg-white shadow-sm rounded-xl p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-semibold">Elegant Design</span>
                      </div>
                      <p className="text-sm text-gray-600">Minimalist aesthetics that complement any setting</p>
                    </div>
                    
                    <div className="bg-white shadow-sm rounded-xl p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-semibold">Premium Value</span>
                      </div>
                      <p className="text-sm text-gray-600">Investment in quality that pays dividends in health</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-medium text-white shadow-md transition-all hover:shadow-lg hover:bg-primary-dark"
                    >
                      Explore Collection
                    </button>
                    
                    <button className="inline-flex items-center justify-center text-primary font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Learn More
                    </button>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl"></div>
                  
                  <div className="relative">
                    <img 
                      ref={imageRef}
                      src="https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=500&auto=format&fit=crop" 
                      alt="Elemence Premium Water Glass Bottle Collection" 
                      className="relative z-10 max-w-md rounded-xl shadow-lg" 
                    />
                    
                    {/* Size indicators */}
                    <div className="absolute -right-8 top-1/4 bg-white rounded-full shadow-lg py-2 px-4 z-20">
                      <span className="text-sm font-medium text-gray-800">330ml</span>
                    </div>
                    
                    <div className="absolute -left-8 top-1/2 bg-white rounded-full shadow-lg py-2 px-4 z-20">
                      <span className="text-sm font-medium text-gray-800">750ml</span>
                    </div>
                    
                    <div className="absolute -bottom-4 right-1/4 bg-white rounded-full shadow-lg py-2 px-4 z-20">
                      <span className="text-sm font-medium text-gray-800">1L</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg group">
            <div className="h-48 bg-gradient-to-br from-primary/20 to-accent relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1616118132534-381148898bb4?w=500&auto=format&fit=crop" 
                alt="Elemence Classic Collection" 
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-primary">Bestseller</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Classic Collection</h3>
              <p className="text-gray-600 text-sm mb-4">Our timeless glass bottles with pure mineral water for everyday premium hydration.</p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">From $2.99</div>
                <button className="text-primary text-sm font-medium hover:underline">View Details</button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg group">
            <div className="h-48 bg-gradient-to-br from-secondary/20 to-accent relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1665849814510-85d4e6a5fff3?w=500&auto=format&fit=crop" 
                alt="Elemence Sparkling Collection" 
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-secondary">New</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Sparkling Collection</h3>
              <p className="text-gray-600 text-sm mb-4">Naturally carbonated water with subtle bubbles that refresh and delight your taste buds.</p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">From $3.49</div>
                <button className="text-primary text-sm font-medium hover:underline">View Details</button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg group">
            <div className="h-48 bg-gradient-to-br from-primary/20 to-accent relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1624797432677-6f803a98acb3?w=500&auto=format&fit=crop" 
                alt="Elemence Home & Office" 
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-primary">Subscribe</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Home & Office</h3>
              <p className="text-gray-600 text-sm mb-4">Convenient 5L and 10L options with regular delivery for continuous premium hydration.</p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Subscriptions Available</div>
                <button className="text-primary text-sm font-medium hover:underline">View Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

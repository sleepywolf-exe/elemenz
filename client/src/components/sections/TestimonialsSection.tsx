import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import GlassmorphicCard from '@/components/effects/GlassmorphicCard';

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Auto advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const setupAnimations = () => {
      gsap.from(sliderRef.current, {
        y: 50,
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
    };
    
    // Add a slight delay to ensure refs are populated
    const timeoutId = setTimeout(setupAnimations, 100);
    
    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    // Add empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };

  return (
    <section id="testimonials" ref={sectionRef} className="section bg-primary/5 relative overflow-hidden py-20">
      <div className="container mx-auto px-4">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl opacity-70"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl opacity-70"></div>
        
        {/* Quote marks decorative element */}
        <div className="absolute top-20 left-20 text-[120px] font-serif text-primary/10 leading-none">"</div>
        <div className="absolute bottom-20 right-20 text-[120px] font-serif text-primary/10 leading-none">"</div>
        
        <div className="text-center mb-16 relative z-10">
          <div className="inline-block mb-3">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="text-primary font-medium">CUSTOMER VOICES</span>
              <div className="h-[1px] w-8 bg-primary"></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from those who have experienced the Elemence difference in their daily hydration.
          </p>
        </div>
        
        {/* Featured testimonial */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-2/5 bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                <img 
                  src={testimonials[0].image} 
                  alt={testimonials[0].author}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:bg-gradient-to-b"></div>
                
                {/* Quote icon */}
                <div className="absolute bottom-4 right-4 md:top-4 md:left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              </div>
              
              <div className="w-full md:w-3/5 p-8 md:p-12">
                <div className="flex items-center mb-6">
                  <div className="text-amber-400 flex">
                    {renderStars(testimonials[0].rating)}
                  </div>
                </div>
                
                <blockquote className="text-xl font-light italic text-gray-700 mb-6 leading-relaxed">
                  "{testimonials[0].text}"
                </blockquote>
                
                <div className="flex items-center">
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonials[0].author}</h4>
                    <p className="text-primary text-sm">{testimonials[0].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial grid for desktop */}
        <div ref={sliderRef} className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.slice(1).map((testimonial, index) => (
            <GlassmorphicCard 
              key={index}
              className="p-6 transition-all duration-300"
              blur={8}
              opacity={0.15}
              hoverEffect={true}
              borderColor="rgba(79, 176, 229, 0.2)"
            >
              <div className="flex items-center mb-6">
                <div className="text-amber-400 flex">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 relative z-10">"{testimonial.text}"</p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-primary/20">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                  <p className="text-primary text-sm">{testimonial.role}</p>
                </div>
              </div>
            </GlassmorphicCard>
          ))}
        </div>
        
        {/* Mobile testimonial carousel */}
        {isMobile && (
          <div className="relative mb-12">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden"
              >
                <GlassmorphicCard
                  className="p-6"
                  blur={8}
                  opacity={0.15}
                  borderColor="rgba(79, 176, 229, 0.2)"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-amber-400 flex">
                      {renderStars(testimonials[currentSlide].rating)}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 relative z-10">"{testimonials[currentSlide].text}"</p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-primary/20">
                      <img 
                        src={testimonials[currentSlide].image}
                        alt={testimonials[currentSlide].author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{testimonials[currentSlide].author}</h4>
                      <p className="text-primary text-sm">{testimonials[currentSlide].role}</p>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            </AnimatePresence>
            
            {/* Carousel controls */}
            <div className="flex justify-between items-center mt-8">
              <button 
                onClick={() => goToSlide((currentSlide - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full ${currentSlide === index ? 'bg-primary' : 'bg-gray-300'} transition-colors`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={() => goToSlide((currentSlide + 1) % testimonials.length)}
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* Call to action */}
        <div className="text-center">
          <a href="#contact" className="inline-flex items-center text-primary font-medium hover:underline">
            <span>Share your Elemence experience</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

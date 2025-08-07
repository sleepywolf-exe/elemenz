import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import CompositionSection from '@/components/sections/CompositionSection';
import AdvantagesSection from '@/components/sections/AdvantagesSection';
import ProductsSection from '@/components/sections/ProductsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

// Special effects
import RainDropEffect from '@/components/effects/RainDropEffect';
import WaterCursorTrail from '@/components/effects/WaterCursorTrail';
import CustomCursor from '@/components/effects/CustomCursor';
import DynamicBackground from '@/components/effects/DynamicBackground';
import WaterParticles from '@/components/effects/WaterParticles';
import HorizontalScrollSection from '@/components/effects/HorizontalScrollSection';
import GlassmorphicCard from '@/components/effects/GlassmorphicCard';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showSpecialEffects, setShowSpecialEffects] = useState(false);

  useEffect(() => {
    // Simulate loading to show the loader
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Wait a bit to let the page render first before adding special effects
      setTimeout(() => {
        setShowSpecialEffects(true);
      }, 1000);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Loader */}
      <Loader loading={loading} />

      {/* Dynamic background that changes color on scroll */}
      {showSpecialEffects && (
        <DynamicBackground
          colorStops={[
            { position: 0, color: '#F0F9FF' },    // Light blue at top
            { position: 0.2, color: '#E0F2FE' },  // Slightly deeper blue
            { position: 0.4, color: '#E0F7FF' },  // Back to light
            { position: 0.6, color: '#E1EFFE' },  // Slight variation
            { position: 0.8, color: '#EFF6FF' },  // Bluish white
            { position: 1, color: '#F0F9FF' }     // Back to light blue
          ]}
        />
      )}

      {/* Water particles in background */}
      {showSpecialEffects && (
        <WaterParticles 
          count={40} 
          baseColor="210" 
          connectParticles={true} 
          mouseInteraction={true}
        />
      )}

      {/* Rain drop effect with slight opacity */}
      {showSpecialEffects && (
        <RainDropEffect 
          density={20} 
          opacity={0.15} 
          speed={0.7}
        />
      )}

      {/* Custom cursor for premium feel */}
      {showSpecialEffects && (
        <CustomCursor
          color="#4FB0E5"
          size={12}
          ringSize={36}
        />
      )}

      {/* Water droplet cursor trail */}
      {showSpecialEffects && (
        <WaterCursorTrail
          color="#4FB0E5"
          particleCount={15}
          particleSize={18}
        />
      )}

      {/* Header Navigation */}
      <Header />

      {/* Main Content - Hero, About, Composition */}
      <main className="w-full">
        <HeroSection />
        <AboutSection />
        <CompositionSection />
      </main>

      {/* Horizontal Scroll Section for Product Display */}
      <HorizontalScrollSection id="product-showcase" className="my-10">
        <div className="panel w-screen h-screen flex flex-col items-center justify-center px-12">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Discover <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Elemence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl text-center mb-10">
            Swipe horizontally to explore our premium plastic-free water collection
          </p>
        </div>
        
        <div className="panel w-screen h-screen flex items-center justify-center px-12">
          <GlassmorphicCard className="p-8 w-full max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-64 h-64">
                <img 
                  src="https://images.unsplash.com/photo-1563387852576-964bc31b73af?w=500&auto=format&fit=crop" 
                  alt="Elemence Original" 
                  className="w-full h-full object-contain" 
                />
                <div className="absolute -top-4 -right-4 bg-primary/20 rounded-full p-3 backdrop-blur-sm">
                  <span className="text-sm font-bold">Premium</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Elemence Original</h3>
                <p className="text-gray-600 mb-6">
                  Our signature pure water with perfect mineral balance, sourced from pristine mountain springs and bottled in eco-friendly glass.
                </p>
                <div className="flex gap-4">
                  <div className="bg-primary/10 px-3 py-1 rounded-full">
                    <span className="text-sm text-primary">pH 7.8</span>
                  </div>
                  <div className="bg-primary/10 px-3 py-1 rounded-full">
                    <span className="text-sm text-primary">Zero Plastic</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassmorphicCard>
        </div>
        
        <div className="panel w-screen h-screen flex items-center justify-center px-12">
          <GlassmorphicCard className="p-8 w-full max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-64 h-64">
                <img 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop" 
                  alt="Elemence Sparkling" 
                  className="w-full h-full object-contain" 
                />
                <div className="absolute -top-4 -right-4 bg-secondary/20 rounded-full p-3 backdrop-blur-sm">
                  <span className="text-sm font-bold">New</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Elemence Sparkling</h3>
                <p className="text-gray-600 mb-6">
                  The perfect balance of effervescence and minerality. Naturally carbonated with tiny bubbles for a refreshing experience.
                </p>
                <div className="flex gap-4">
                  <div className="bg-primary/10 px-3 py-1 rounded-full">
                    <span className="text-sm text-primary">pH 7.2</span>
                  </div>
                  <div className="bg-primary/10 px-3 py-1 rounded-full">
                    <span className="text-sm text-primary">Zero Plastic</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassmorphicCard>
        </div>
      </HorizontalScrollSection>

      {/* Continue with other sections */}
      <div className="w-full">
        <AdvantagesSection />
        <ProductsSection />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}

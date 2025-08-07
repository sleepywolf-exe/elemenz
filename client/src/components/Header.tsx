import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { scrollToSection } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavLinkClick = (sectionId: string) => {
    scrollToSection(sectionId);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-12 
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-md' 
          : 'bg-white/80 backdrop-blur-sm'}`}
    >
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary tracking-tight">Elemence</span>
            <span className="ml-1 text-xs font-medium text-gray-500 tracking-wider uppercase mt-1.5">Water</span>
          </Link>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8">
            {['hero', 'about', 'composition', 'advantages', 'products', 'process', 'testimonials', 'contact'].map((section) => (
              <li key={section}>
                <button 
                  onClick={() => handleNavLinkClick(section)}
                  className="font-medium text-gray-800 hover:text-primary relative group px-2 py-1"
                >
                  <span>{section === 'hero' ? 'Home' : section}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
            ))}
          </ul>
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary focus:outline-none" 
              aria-label="Toggle mobile menu"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg py-6 px-6 z-50 md:hidden"
          >
            <ul className="space-y-2">
              {['hero', 'about', 'composition', 'advantages', 'products', 'process', 'testimonials', 'contact'].map((section) => (
                <li key={section}>
                  <button 
                    onClick={() => handleNavLinkClick(section)}
                    className="block w-full text-left py-3 px-4 rounded-lg font-medium text-gray-800 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {section === 'hero' ? 'Home' : section}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

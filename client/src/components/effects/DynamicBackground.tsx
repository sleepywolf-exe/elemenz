import { useEffect, useState } from 'react';

interface ColorStop {
  position: number;
  color: string;
}

interface DynamicBackgroundProps {
  colorStops: ColorStop[];
  className?: string;
}

const DynamicBackground = ({
  colorStops,
  className = '',
}: DynamicBackgroundProps) => {
  const [currentColor, setCurrentColor] = useState('');
  
  useEffect(() => {
    if (!colorStops || colorStops.length === 0) return;
    
    // Sort color stops by position
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    
    // Function to interpolate between two colors
    const interpolateColor = (color1: string, color2: string, factor: number) => {
      // Parse hexadecimal colors to RGB
      const hex1 = color1.startsWith('#') ? color1.substring(1) : color1;
      const hex2 = color2.startsWith('#') ? color2.substring(1) : color2;
      
      // Parse RGB components
      const r1 = parseInt(hex1.substring(0, 2), 16);
      const g1 = parseInt(hex1.substring(2, 4), 16);
      const b1 = parseInt(hex1.substring(4, 6), 16);
      
      const r2 = parseInt(hex2.substring(0, 2), 16);
      const g2 = parseInt(hex2.substring(2, 4), 16);
      const b2 = parseInt(hex2.substring(4, 6), 16);
      
      // Interpolate RGB values
      const r = Math.round(r1 + factor * (r2 - r1));
      const g = Math.round(g1 + factor * (g2 - g1));
      const b = Math.round(b1 + factor * (b2 - b1));
      
      // Convert back to hex
      const rHex = r.toString(16).padStart(2, '0');
      const gHex = g.toString(16).padStart(2, '0');
      const bHex = b.toString(16).padStart(2, '0');
      
      return `#${rHex}${gHex}${bHex}`;
    };
    
    // Function to update color based on scroll position
    const updateColor = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollTop / docHeight;
      
      // Find the two color stops that the current scroll position falls between
      let lowerStop = sortedStops[0];
      let upperStop = sortedStops[sortedStops.length - 1];
      
      for (let i = 0; i < sortedStops.length - 1; i++) {
        if (
          scrollPercentage >= sortedStops[i].position &&
          scrollPercentage < sortedStops[i + 1].position
        ) {
          lowerStop = sortedStops[i];
          upperStop = sortedStops[i + 1];
          break;
        }
      }
      
      // Calculate interpolation factor between the two stops
      const stopRange = upperStop.position - lowerStop.position;
      const relativeProgress = stopRange === 0 
        ? 0 
        : (scrollPercentage - lowerStop.position) / stopRange;
      
      // Interpolate color
      const interpolated = interpolateColor(
        lowerStop.color,
        upperStop.color,
        relativeProgress
      );
      
      setCurrentColor(interpolated);
    };
    
    // Initial update
    updateColor();
    
    // Add scroll listener
    window.addEventListener('scroll', updateColor);
    
    return () => {
      window.removeEventListener('scroll', updateColor);
    };
  }, [colorStops]);
  
  return (
    <div 
      className={`fixed top-0 left-0 w-full h-full -z-10 transition-colors duration-700 ${className}`}
      style={{ backgroundColor: currentColor }}
    />
  );
};

export default DynamicBackground;
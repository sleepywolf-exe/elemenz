import { useEffect, useState, useRef } from 'react';

interface CustomCursorProps {
  color?: string;
  size?: number;
  ringSize?: number;
  ringColor?: string;
  dotBlur?: boolean;
}

const CustomCursor = ({
  color = '#4FB0E5',
  size = 20,
  ringSize = 40,
  ringColor = 'rgba(79, 176, 229, 0.3)',
  dotBlur = true,
}: CustomCursorProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    
    // Detect when mouse enters/leaves window
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    // Detect mouse down/up for click animation
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    // Detect hovering over clickable elements
    const handleElementsHover = () => {
      const hoveredElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      
      hoveredElements.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
      
      return () => {
        hoveredElements.forEach(el => {
          el.removeEventListener('mouseenter', () => setIsHovering(true));
          el.removeEventListener('mouseleave', () => setIsHovering(false));
        });
      };
    };
    
    const hoverCleanup = handleElementsHover();
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Add special style for links and buttons
    const style = document.createElement('style');
    style.innerHTML = `
      a, button, [role="button"], input, select, textarea {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      hoverCleanup();
      
      // Restore default cursor
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, [isVisible]);
  
  useEffect(() => {
    // Apply spring animation to cursor movement (smoother than CSS transitions)
    if (!cursorRef.current || !ringRef.current) return;
    
    let cursorX = position.x;
    let cursorY = position.y;
    let ringX = position.x;
    let ringY = position.y;
    
    const animate = () => {
      // Calculate spring animation
      // Dot follows cursor closely
      const dotSpring = 0.2;
      cursorX += (position.x - cursorX) * dotSpring;
      cursorY += (position.y - cursorY) * dotSpring;
      
      // Ring follows with delay
      const ringSpring = 0.1;
      ringX += (position.x - ringX) * ringSpring;
      ringY += (position.y - ringY) * ringSpring;
      
      // Apply positions
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      }
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [position]);
  
  // Styles for the cursor
  const cursorStyles = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    filter: dotBlur ? 'blur(4px)' : 'none',
    opacity: isVisible ? 1 : 0,
    transform: `translate(${position.x}px, ${position.y}px)`,
  };
  
  // Styles for the ring
  const ringStyles = {
    width: `${ringSize}px`,
    height: `${ringSize}px`,
    borderColor: ringColor,
    opacity: isVisible ? 1 : 0,
    transform: `translate(${position.x}px, ${position.y}px)`,
    scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
  };
  
  return (
    <>
      {/* Dot cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-opacity duration-150"
        style={{
          ...cursorStyles,
          marginLeft: `-${size / 2}px`,
          marginTop: `-${size / 2}px`,
        }}
      />
      
      {/* Ring cursor */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border-2 pointer-events-none z-[9998] transition-[opacity,scale] duration-150"
        style={{
          ...ringStyles,
          marginLeft: `-${ringSize / 2}px`,
          marginTop: `-${ringSize / 2}px`,
        }}
      />
    </>
  );
};

export default CustomCursor;
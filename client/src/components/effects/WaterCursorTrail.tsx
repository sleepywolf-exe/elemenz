import { useEffect, useRef } from 'react';

interface WaterCursorTrailProps {
  color?: string;
  particleCount?: number;
  fadeRate?: number;
  particleSize?: number;
}

const WaterCursorTrail = ({
  color = '#4FB0E5',
  particleCount = 20,
  fadeRate = 0.96,
  particleSize = 15
}: WaterCursorTrailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Cursor trail points
    const points: {
      x: number;
      y: number;
      age: number;
      size: number;
      vx: number;
      vy: number;
    }[] = [];
    
    let mouseX = 0;
    let mouseY = 0;
    let lastX = 0;
    let lastY = 0;
    let isMoving = false;
    let frameCount = 0;
    
    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;
      
      // Add a trail point every few frames to smooth out
      if (frameCount % 2 === 0) {
        const velocityX = mouseX - lastX;
        const velocityY = mouseY - lastY;
        
        // Add new point to the trail
        points.push({
          x: mouseX,
          y: mouseY,
          age: 0,
          size: particleSize * (0.5 + Math.random() * 0.5),
          vx: velocityX * 0.1,
          vy: velocityY * 0.1
        });
        
        // Keep points array manageable
        if (points.length > particleCount * 2) {
          points.shift();
        }
      }
      
      lastX = mouseX;
      lastY = mouseY;
    };
    
    const handleMouseLeave = () => {
      isMoving = false;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Animation loop
    let animationFrameId: number;
    
    const render = () => {
      frameCount++;
      
      // Fade existing canvas content
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeRate})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw new elements
      ctx.globalCompositeOperation = 'source-over';
      
      // Update and draw trail points
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        point.age++;
        point.x += point.vx;
        point.y += point.vy;
        
        // Slow down velocity
        point.vx *= 0.96;
        point.vy *= 0.96;
        
        // Calculate opacity based on age
        const opacity = Math.max(0, 1 - (point.age / particleCount));
        
        // Draw water drop
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.size
        );
        gradient.addColorStop(0, `${color}FF`);
        gradient.addColorStop(0.6, `${color}80`);
        gradient.addColorStop(1, `${color}00`);
        
        ctx.fillStyle = gradient;
        
        // Draw a teardrop shape
        ctx.save();
        ctx.translate(point.x, point.y);
        ctx.rotate(Math.atan2(point.vy, point.vx) + Math.PI / 2);
        ctx.beginPath();
        ctx.arc(0, 0, point.size * 0.7, 0, Math.PI, true);
        ctx.lineTo(0, point.size * 1.3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        
        // Remove old points
        if (point.age > particleCount * 1.5) {
          points.splice(i, 1);
          i--;
        }
      }
      
      // Continue animation loop
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, particleCount, fadeRate, particleSize]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ opacity: 0.7 }}
    />
  );
};

export default WaterCursorTrail;
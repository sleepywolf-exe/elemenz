import React, { ReactNode } from 'react';

interface GlassmorphicCardProps {
  children: ReactNode;
  className?: string;
  blur?: number; // Backdrop blur amount (default: 10)
  opacity?: number; // Background opacity (default: 0.2)
  borderColor?: string; // Border color (default: white with 30% opacity)
  hoverEffect?: boolean; // Whether to add hover effect (default: true)
  onClick?: () => void;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className = '',
  blur = 10,
  opacity = 0.2,
  borderColor = 'rgba(255, 255, 255, 0.3)',
  hoverEffect = true,
  onClick,
}) => {
  // Base styles for glassmorphic effect
  const baseStyles: React.CSSProperties = {
    backdropFilter: `blur(${blur}px)`,
    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    borderColor,
  };
  
  // Classes for hover effect
  const hoverClasses = hoverEffect
    ? 'transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg'
    : '';
  
  return (
    <div
      className={`
        relative
        rounded-xl 
        border
        shadow-sm
        overflow-hidden
        ${hoverClasses}
        ${className}
      `}
      style={baseStyles}
      onClick={onClick}
    >
      {/* Optional decorative elements */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassmorphicCard;
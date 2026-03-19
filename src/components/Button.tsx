import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  showGlow?: boolean;
  magnetic?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
  showGlow = false,
  magnetic = true,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Magnetic effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const moveX = useTransform(springX, (val) => val * 0.35);
  const moveY = useTransform(springY, (val) => val * 0.35);
  
  const spanMoveX = useTransform(springX, (val) => val * 0.1);
  const spanMoveY = useTransform(springY, (val) => val * 0.1);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || disabled || !buttonRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: clientX - center.x, y: clientY - center.y };
    
    mouseX.set(distance.x);
    mouseY.set(distance.y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const baseStyles = 'relative font-medium rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center overflow-hidden';

  const variantStyles = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-400 shadow-lg hover:shadow-indigo-500/20',
    secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 focus:ring-slate-300 shadow-sm',
    glass: 'glass text-slate-900 hover:bg-white/90 hover:shadow-xl border-white/40',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100/50 hover:text-slate-900',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-5 text-lg',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      style={{
        x: magnetic ? moveX : 0,
        y: magnetic ? moveY : 0,
      }}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98, transition: { type: "spring", stiffness: 400, damping: 10 } } : {}}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${widthStyle}
        ${disabledStyle}
        ${className}
      `}
    >
      {showGlow && variant === 'primary' && (
        <motion.div 
          className="absolute -inset-1 bg-indigo-500/10 blur-xl rounded-2xl pointer-events-none -z-10"
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1] 
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {showGlow && variant !== 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
      )}
      <motion.span 
        className="relative z-10"
        style={{
          x: magnetic ? spanMoveX : 0,
          y: magnetic ? spanMoveY : 0,
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  type?: 'fade-up' | 'fade-in' | 'scale' | 'reveal' | 'tilt';
  threshold?: number;
}

export const MotionWrapper: React.FC<MotionWrapperProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  duration = 0.8,
  type = 'fade-up',
  threshold = 0.1
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Tilt effect values
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [0, 1], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (type !== 'tilt' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width;
    const yPct = mouseY / height;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (type !== 'tilt') return;
    x.set(0.5);
    y.set(0.5);
    setIsHovered(false);
  };

  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 }
    },
    'fade-in': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    'scale': {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 }
    },
    'reveal': {
      hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
      visible: { opacity: 1, clipPath: 'inset(0 0% 0 0)' }
    },
    'tilt': {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      variants={variants[type]}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: true, amount: threshold }}
      style={{
        rotateX: type === 'tilt' ? rotateX : 0,
        rotateY: type === 'tilt' ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      <div 
        style={{ 
          transform: type === 'tilt' && isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

export const Cursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('button, a, [data-interactive]');
      
      if (interactive) {
        setIsHovering(true);
        const text = interactive.getAttribute('data-cursor-text') || '';
        const variant = interactive.getAttribute('data-cursor-variant') || 'hover';
        setCursorText(text);
        setCursorVariant(variant);
      } else {
        setIsHovering(false);
        setCursorText('');
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Main Cursor Dot */}
      <motion.div
        className="absolute top-0 left-0 w-2 h-2 bg-indigo-600 rounded-full mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Outer Spring Ring */}
      <motion.div
        className="absolute top-0 left-0 border border-indigo-600 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 80 : 40,
          height: isHovering ? 80 : 40,
          backgroundColor: isHovering ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(79, 70, 229, 0.5)' : 'rgba(79, 70, 229, 0.3)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-white px-2 py-1 rounded-full shadow-lg"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Trailing Glow */}
      <motion.div
        className="absolute top-0 left-0 w-40 h-40 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
};

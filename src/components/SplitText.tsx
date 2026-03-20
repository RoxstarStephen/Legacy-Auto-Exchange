import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({ 
  text, 
  className = '', 
  delay = 0,
  stagger = 0.05 
}) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 640;
  });
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Performance: SplitText can create many DOM nodes (one per word).
  // On mobile we render as a single animated span to avoid layout thrash.
  if (isMobile) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <motion.span
          // On mobile we avoid `whileInView` so headings never remain invisible
          // if the element doesn't trigger viewport observation correctly.
          initial={{ opacity: 0, y: '10%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay,
          }}
          className="inline-block"
        >
          {text}
        </motion.span>
      </div>
    );
  }

  const words = text.split(' ');

  return (
    <div className={`overflow-hidden flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: '100%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * stagger,
          }}
          className="inline-block mr-[0.25em] whitespace-nowrap"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

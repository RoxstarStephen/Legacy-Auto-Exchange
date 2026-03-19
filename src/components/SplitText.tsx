import React from 'react';
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
            ease: [0.33, 1, 0.68, 1],
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

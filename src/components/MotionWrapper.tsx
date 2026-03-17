import React from 'react';
import { motion } from 'framer-motion';

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const MotionWrapper: React.FC<MotionWrapperProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

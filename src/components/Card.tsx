import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
}) => {
  const baseStyles = 'rounded-lg p-6 transition-all duration-300';
  const variantStyles = {
    default: 'bg-white border border-slate-200/60 shadow-micro',
    elevated: 'bg-white border border-slate-200/60 shadow-micro hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.1)]',
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

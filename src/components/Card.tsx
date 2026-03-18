import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass';
  id?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  id,
}) => {
  const baseStyles = 'rounded-2xl p-6 transition-all duration-500';
  const variantStyles = {
    default: 'bg-white border border-slate-200/60 shadow-sm hover:shadow-md',
    elevated: 'bg-white border border-slate-200/60 shadow-md hover:shadow-xl hover:-translate-y-1',
    glass: 'glass hover:bg-white/80 hover:shadow-2xl hover:-translate-y-1',
  };

  return (
    <div id={id} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

import React from 'react';

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  prefix?: string;
  as?: 'input' | 'select';
  children?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
  disabled = false,
  className = '',
  prefix,
  as = 'input',
  children,
}) => {
  const baseStyles = 'w-full h-12 px-4 border border-slate-300 rounded-md text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400/30 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500';

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm font-medium">
            {prefix}
          </span>
        )}
        {as === 'input' ? (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={`${baseStyles} ${prefix ? 'pl-12' : ''} ${className}`}
          />
        ) : (
          <select
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={`${baseStyles} ${className}`}
          >
            {children}
          </select>
        )}
      </div>
    </div>
  );
};

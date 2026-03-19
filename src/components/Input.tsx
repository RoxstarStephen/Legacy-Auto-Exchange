import React, { useId } from 'react';

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
  name?: string;
  id?: string;
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
  name,
  id,
  as = 'input',
  children,
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const baseStyles = 'w-full h-14 px-4 bg-white/50 border border-slate-200 rounded-2xl text-base transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white disabled:bg-slate-50 disabled:text-slate-500 font-medium';

  return (
    <div className="space-y-3">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-bold text-slate-900 uppercase tracking-widest leading-none">
          {label}
          {required && <span className="text-indigo-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative group/input">
        {prefix && (
          <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm font-bold tracking-tight">
            {prefix}
          </span>
        )}
        {as === 'input' ? (
          <input
            id={inputId}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            required={required}
            disabled={disabled}
            className={`${baseStyles} ${prefix ? 'pl-14' : ''} ${className}`}
          />
        ) : (
          <select
            id={inputId}
            value={value}
            onChange={onChange}
            name={name}
            required={required}
            disabled={disabled}
            className={`${baseStyles} appearance-none ${className}`}
          >
            {children}
          </select>
        )}
      </div>
    </div>
  );
};

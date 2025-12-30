import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'default', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-apple-button font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    default: 'bg-apple-blue text-white hover:opacity-90 focus:ring-apple-blue shadow-sm',
    outline: 'border border-apple-gray-4 text-apple-gray-1 hover:bg-apple-gray-5 focus:ring-apple-gray-4',
    secondary: 'bg-apple-gray-5 text-apple-gray-1 hover:bg-apple-gray-4 focus:ring-apple-gray-4',
    ghost: 'text-apple-gray-2 hover:bg-apple-gray-5 hover:text-apple-gray-1 focus:ring-apple-gray-4'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
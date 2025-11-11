import React from 'react';

const Pill = ({ 
  children, 
  variant = 'default',
  size = 'default',
  className = '',
  ...props 
}) => {
  const variantClasses = {
    default: 'bg-brand-tealSoft text-brand-teal',
    coral: 'bg-brand-coral/10 text-brand-coral',
    lavender: 'bg-brand-lavender/10 text-brand-lavender',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
    white: 'bg-white/90 text-brand-ink backdrop-blur-sm',
    dark: 'bg-brand-ink text-white'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    default: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const classes = `inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Pill;

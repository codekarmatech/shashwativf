import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'default',
  href,
  to,
  onClick,
  disabled = false,
  className = '',
  icon,
  iconPosition = 'left',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-brand-coral text-white hover:bg-opacity-90 focus:ring-brand-coral shadow-md hover:shadow-lg',
    secondary: 'bg-brand-teal text-white hover:bg-opacity-90 focus:ring-brand-teal shadow-md hover:shadow-lg',
    outline: 'border-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white focus:ring-brand-teal',
    ghost: 'text-brand-teal hover:bg-brand-tealSoft focus:ring-brand-teal',
    white: 'bg-white text-brand-ink hover:bg-gray-50 focus:ring-gray-500 shadow-md hover:shadow-lg'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-full',
    default: 'px-6 py-3 text-sm rounded-full',
    lg: 'px-8 py-4 text-base rounded-full',
    xl: 'px-10 py-5 text-lg rounded-full'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button 
      className={classes} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
};

// Convenience components
export const PrimaryButton = (props) => <Button variant="primary" {...props} />;
export const SecondaryButton = (props) => <Button variant="secondary" {...props} />;
export const OutlineButton = (props) => <Button variant="outline" {...props} />;
export const GhostButton = (props) => <Button variant="ghost" {...props} />;
export const WhiteButton = (props) => <Button variant="white" {...props} />;

export default Button;

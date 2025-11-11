import React from 'react';

const Section = ({ 
  children, 
  className = '', 
  background = 'default',
  padding = 'default',
  maxWidth = '7xl'
}) => {
  const backgroundClasses = {
    default: 'bg-brand-bg',
    white: 'bg-white',
    gradient: 'bg-gradient-to-br from-brand-tealSoft via-white to-brand-lavender/10',
    dark: 'bg-brand-ink',
    teal: 'bg-brand-teal'
  };

  const paddingClasses = {
    none: '',
    sm: 'py-8',
    default: 'py-16',
    lg: 'py-24',
    xl: 'py-32'
  };

  const maxWidthClasses = {
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <section className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}>
      <div className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}>
        {children}
      </div>
    </section>
  );
};

export default Section;

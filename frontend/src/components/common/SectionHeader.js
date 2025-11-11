import React from 'react';

const SectionHeader = ({ 
  title, 
  subtitle, 
  description, 
  alignment = 'center',
  titleSize = 'default',
  className = ''
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const titleSizeClasses = {
    sm: 'text-2xl md:text-3xl',
    default: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl',
    xl: 'text-5xl md:text-6xl'
  };

  return (
    <div className={`${alignmentClasses[alignment]} ${className}`}>
      {subtitle && (
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-tealSoft text-brand-teal mb-4">
          {subtitle}
        </div>
      )}
      
      <h2 className={`font-heading font-bold text-brand-ink ${titleSizeClasses[titleSize]} mb-4`}>
        {title}
      </h2>
      
      {description && (
        <p className="text-lg text-brand-muted max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;

import React from 'react';
import { motion } from 'framer-motion';

const GradientCard = ({ 
  children, 
  gradient = 'default',
  glass = false,
  className = '',
  animated = true,
  hover = true,
  ...props 
}) => {
  const gradientClasses = {
    default: 'bg-gradient-to-br from-brand-tealSoft via-white to-brand-lavender/20',
    teal: 'bg-gradient-to-br from-brand-teal to-brand-teal/80',
    coral: 'bg-gradient-to-br from-brand-coral to-brand-coral/80',
    lavender: 'bg-gradient-to-br from-brand-lavender to-brand-lavender/80',
    soft: 'bg-gradient-to-br from-white via-brand-tealSoft/30 to-brand-lavender/10'
  };

  const glassClasses = glass 
    ? 'bg-white/70 backdrop-blur-xl border border-white/50' 
    : gradientClasses[gradient];

  const baseClasses = `rounded-3xl shadow-card p-6 ${glassClasses} ${className}`;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const hoverVariants = hover ? {
    hover: { 
      y: -4,
      scale: 1.02,
      boxShadow: "0 25px 60px rgba(15, 23, 42, 0.12)",
      transition: { duration: 0.2, ease: "easeOut" }
    }
  } : {};

  if (animated) {
    return (
      <motion.div
        className={baseClasses}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover={hover ? "hover" : undefined}
        viewport={{ once: true, margin: "-100px" }}
        {...hoverVariants}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
};

export default GradientCard;

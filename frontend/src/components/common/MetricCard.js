import React from 'react';
import { motion } from 'framer-motion';

const MetricCard = ({ 
  value, 
  label, 
  description, 
  icon, 
  color = 'teal',
  animated = true,
  className = ''
}) => {
  const colorClasses = {
    teal: 'text-brand-teal bg-brand-tealSoft',
    coral: 'text-brand-coral bg-brand-coral/10',
    lavender: 'text-brand-lavender bg-brand-lavender/10',
    ink: 'text-brand-ink bg-brand-ink/10'
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const hoverVariants = {
    hover: { 
      y: -4,
      scale: 1.02,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const CardContent = () => (
    <div className={`bg-white rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 h-full flex flex-col ${className}`}>
      <div className="text-center flex-1 flex flex-col justify-center">
        {icon && (
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 mx-auto ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
        
        <div className={`text-3xl md:text-4xl font-bold mb-2 ${colorClasses[color].split(' ')[0]}`}>
          {value}
        </div>
        
        <div className="text-brand-ink font-semibold mb-1">
          {label}
        </div>
        
        {description && (
          <div className="text-sm text-brand-muted leading-tight">
            {description}
          </div>
        )}
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: "-100px" }}
        {...hoverVariants}
      >
        <CardContent />
      </motion.div>
    );
  }

  return <CardContent />;
};

export default MetricCard;

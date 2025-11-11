import React from 'react';
import { motion } from 'framer-motion';

const Stepper = ({ 
  steps, 
  orientation = 'horizontal',
  showNumbers = true,
  className = ''
}) => {
  const containerClasses = orientation === 'horizontal' 
    ? 'flex items-center justify-between' 
    : 'flex flex-col space-y-8';

  const stepVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className={`${containerClasses} ${className}`}>
      {steps.map((step, index) => (
        <div key={index} className={`flex items-center ${orientation === 'horizontal' ? 'flex-1' : ''}`}>
          <motion.div
            custom={index}
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center"
          >
            {/* Step Circle */}
            <div className="flex items-center justify-center w-12 h-12 bg-brand-teal text-white rounded-full font-semibold text-sm shadow-md">
              {showNumbers ? index + 1 : step.icon}
            </div>
            
            {/* Step Content */}
            <div className={`${orientation === 'horizontal' ? 'ml-4' : 'ml-4'}`}>
              <h4 className="font-semibold text-brand-ink text-sm md:text-base">
                {step.title}
              </h4>
              {step.description && (
                <p className="text-brand-muted text-xs md:text-sm mt-1">
                  {step.description}
                </p>
              )}
            </div>
          </motion.div>
          
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className={`
              ${orientation === 'horizontal' 
                ? 'flex-1 h-0.5 bg-brand-tealSoft mx-4' 
                : 'w-0.5 h-8 bg-brand-tealSoft ml-6 -mt-4'
              }
            `} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;

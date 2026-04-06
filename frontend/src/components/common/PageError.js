import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';
import GradientCard from './GradientCard';
import Section from './Section';

const PageError = ({ 
  message = "We're having trouble loading this content right now.", 
  onRetry,
  className = "" 
}) => {
  return (
    <Section padding="lg" className={`${className}`}>
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GradientCard gradient="coral" className="p-8 text-center text-white">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FaExclamationTriangle className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="font-heading font-bold text-2xl mb-4">
              Oops! Something went wrong
            </h2>
            
            <p className="text-white/90 mb-8 leading-relaxed">
              {message}
            </p>
            
            {onRetry ? (
              <button 
                onClick={onRetry}
                className="inline-flex items-center space-x-2 px-8 py-3 bg-white text-brand-coral rounded-full font-bold hover:bg-brand-tealSoft hover:text-brand-teal transition-all duration-300 shadow-md active:scale-95"
              >
                <FaRedo className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            ) : (
              <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center space-x-2 px-8 py-3 bg-white text-brand-coral rounded-full font-bold hover:bg-brand-tealSoft hover:text-brand-teal transition-all duration-300 shadow-md active:scale-95"
              >
                <FaRedo className="w-4 h-4" />
                <span>Refresh Page</span>
              </button>
            )}
          </GradientCard>
        </motion.div>
      </div>
    </Section>
  );
};

export default PageError;

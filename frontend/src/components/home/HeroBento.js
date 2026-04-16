import React from 'react';
import { motion } from 'framer-motion';
import { FaSnowflake, FaHeart } from 'react-icons/fa';
import { PrimaryButton, SecondaryButton } from '../common/Button';
import { OutlineButton } from '../common/Button';
import { useClinicInfoData } from '../../hooks/useClinicInfoData';

const HeroBento = () => {
  const { data: clinicInfo } = useClinicInfoData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 80,
        damping: 20
      }
    }
  };


  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden flex items-center">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-brand-teal/10 to-brand-coral/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-brand-lavender/10 to-brand-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-brand-tealSoft/5 to-transparent rounded-full blur-3xl"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-brand-teal/20">
                <span className="text-sm font-medium text-brand-ink">{clinicInfo.tagline}</span>
              </div>
              <div className="bg-brand-coral/10 rounded-full px-4 py-2 border border-brand-coral/20">
                <span className="text-sm font-medium text-brand-coral">20+ Years Excellence</span>
              </div>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-tight">
                Your fertility journey starts with{' '}
                <span className="bg-gradient-to-r from-brand-teal to-brand-coral bg-clip-text text-transparent relative">
                  trusted care
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                {clinicInfo.description}
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <PrimaryButton size="lg" to="/contact" className="shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                Book Free Consultation
              </PrimaryButton>
              <SecondaryButton size="lg" to="/services" className="shadow-lg hover:shadow-xl transition-all duration-300">
                Explore All Services
              </SecondaryButton>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Available 24/7</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaHeart className="w-4 h-4 text-brand-coral" />
                <span className="text-sm text-gray-600">NABH Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-brand-teal rounded-full"></div>
                <span className="text-sm text-gray-600">FOGSI Training Centre</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Element */}
          <motion.div variants={itemVariants} className="relative">
            {/* Modern Stats Dashboard */}
            <div className="relative">
              {/* Main Stats Card */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Impact</h3>
                  <p className="text-gray-600">Transforming lives through expert care</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-brand-teal to-brand-coral bg-clip-text text-transparent mb-2">
                      {clinicInfo.metrics.livesImpacted}
                    </div>
                    <div className="text-sm text-gray-600">Lives Impacted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-brand-teal to-brand-coral bg-clip-text text-transparent mb-2">
                      {clinicInfo.metrics.successRate}
                    </div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-brand-teal to-brand-coral bg-clip-text text-transparent mb-2">
                      {clinicInfo.metrics.townsReached}
                    </div>
                    <div className="text-sm text-gray-600">Towns Reached</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-brand-teal to-brand-coral bg-clip-text text-transparent mb-2">
                      {clinicInfo.metrics.yearsExperience}
                    </div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>
                
                {/* Featured Service Highlight */}
                <div className="bg-gradient-to-r from-brand-lavender to-brand-coral rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <FaSnowflake className="w-6 h-6 mr-3" />
                      <span className="font-semibold text-lg">Egg Freezing</span>
                    </div>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">Featured</span>
                  </div>
                  <p className="text-white/90 mb-4">
                    Preserve your fertility with 95% survival rate using advanced vitrification technology.
                  </p>
                  <OutlineButton 
                    variant="white" 
                    size="sm" 
                    to="/services/egg-freezing" 
                    className="text-white border-2 border-white bg-white/10 hover:bg-white hover:text-brand-lavender transition-all duration-300 font-semibold backdrop-blur-sm"
                  >
                    Learn More
                  </OutlineButton>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-brand-teal/20 to-brand-coral/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-brand-lavender/20 to-brand-teal/20 rounded-full blur-xl"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBento;

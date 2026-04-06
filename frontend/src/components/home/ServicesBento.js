import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaFlask, 
  FaSnowflake, 
  FaUserMd, 
  FaHeart, 
  FaMicroscope,
  FaStethoscope,
  FaEye,
  FaHandHoldingHeart,
  FaSyringe,
  FaBaby,
  FaVenus,
  FaMars
} from 'react-icons/fa';
import { useServices } from '../../hooks/useApi';
import { services } from '../../data/services';

const ServicesBento = () => {
  const { data: apiServices, loading } = useServices();
  
  // Fallback to mock data if API fails
  const displayServices = apiServices?.length > 0 ? apiServices : services;
  
  const iconMap = {
    FaFlask: FaFlask,
    FaSnowflake: FaSnowflake,
    FaUserMd: FaUserMd,
    FaMicroscope: FaMicroscope,
    FaStethoscope: FaStethoscope,
    FaEye: FaEye,
    FaHeart: FaHeart,
    FaHandHoldingHeart: FaHandHoldingHeart,
    FaSyringe: FaSyringe,
    FaBaby: FaBaby,
    FaVenus: FaVenus,
    FaMars: FaMars
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Get featured services for large cards
  const featuredServices = displayServices.filter(service => service.featured);
  const regularServices = displayServices.filter(service => !service.featured);

  // Add loading state
  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-ink mb-4">
              Fertility & women's health,{' '}
              <span className="text-brand-teal relative">
                under one roof
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-teal/30 rounded-full"></div>
              </span>
            </h2>
            <p className="text-base md:text-lg text-brand-muted max-w-2xl mx-auto mb-6">
              Comprehensive services designed to support you at every stage of your fertility journey and women's health needs.
            </p>
            
            {/* Compact Stats */}
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="text-lg font-bold text-brand-teal">14+</div>
                <div className="text-xs text-brand-muted">Services</div>
              </div>
              <div className="w-1 h-8 bg-brand-teal/20"></div>
              <div className="text-center">
                <div className="text-lg font-bold text-brand-teal">NABH</div>
                <div className="text-xs text-brand-muted">Accredited</div>
              </div>
              <div className="w-1 h-8 bg-brand-teal/20"></div>
              <div className="text-center">
                <div className="text-lg font-bold text-brand-teal">24/7</div>
                <div className="text-xs text-brand-muted">Support</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Modern Services Grid */}
        <div className="space-y-12">
          {/* Featured Services Row */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {featuredServices.slice(0, 2).map((service, index) => {
              const IconComponent = iconMap[service.icon] || FaHeart;
              const isEggFreezing = service.title === 'Egg Freezing';
              
              return (
                <motion.div key={service.id} variants={itemVariants}>
                  <Link to={`/services/${service.slug}`}>
                    <div className={`relative overflow-hidden rounded-3xl p-8 h-full min-h-[400px] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                      isEggFreezing 
                        ? 'bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 text-white' 
                        : 'bg-white border border-gray-100 shadow-lg hover:shadow-xl text-gray-900'
                    }`}>
                      {/* Background Pattern */}
                      <div className="absolute inset-0">
                        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl transform translate-x-32 -translate-y-32 ${
                          isEggFreezing ? 'bg-white/10' : 'bg-brand-teal/5'
                        }`}></div>
                        <div className={`absolute bottom-0 left-0 w-48 h-48 rounded-full blur-2xl transform -translate-x-24 translate-y-24 ${
                          isEggFreezing ? 'bg-pink-300/20' : 'bg-brand-coral/5'
                        }`}></div>
                      </div>
                      
                      <div className="relative z-10 h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className={`p-4 rounded-2xl ${
                            isEggFreezing 
                              ? 'bg-white/20 backdrop-blur-sm' 
                              : 'bg-gradient-to-br from-brand-teal to-brand-coral text-white'
                          }`}>
                            <IconComponent className="w-8 h-8" />
                          </div>
                          {service.featured && (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              isEggFreezing 
                                ? 'bg-white/20 text-white backdrop-blur-sm' 
                                : 'bg-brand-coral/10 text-brand-coral'
                            }`}>
                              Featured
                            </span>
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="font-heading font-bold text-3xl mb-4">
                            {service.title}
                          </h3>
                          
                          <p className={`text-lg mb-6 leading-relaxed ${
                            isEggFreezing ? 'text-white/90' : 'text-gray-600'
                          }`}>
                            {service.short_description || service.shortDescription}
                          </p>
                          
                          {/* Key Features */}
                          <div className="space-y-3 mb-8">
                            {service.title === 'IVF Treatment' && (
                              <>
                                <div className="flex items-center text-sm text-gray-600">
                                  <div className="w-2 h-2 bg-brand-teal rounded-full mr-3"></div>
                                  Personalized treatment protocols
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <div className="w-2 h-2 bg-brand-teal rounded-full mr-3"></div>
                                  Advanced embryology lab
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <div className="w-2 h-2 bg-brand-teal rounded-full mr-3"></div>
                                  24/7 monitoring & support
                                </div>
                              </>
                            )}
                            {service.title === 'Egg Freezing' && (
                              <>
                                <div className="flex items-center text-sm text-white/80">
                                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                  Advanced vitrification technology
                                </div>
                                <div className="flex items-center text-sm text-white/80">
                                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                  Flexible storage options
                                </div>
                                <div className="flex items-center text-sm text-white/80">
                                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                  Expert counseling support
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between pt-6 border-t border-white/20">
                          <div className="flex space-x-6">
                            {(service.success_rate || service.successRate) && (
                              <div>
                                <div className={`text-2xl font-bold ${isEggFreezing ? 'text-white' : 'text-brand-teal'}`}>
                                  {service.success_rate || service.successRate}
                                </div>
                                <div className={`text-xs ${isEggFreezing ? 'text-white/70' : 'text-gray-500'}`}>
                                  Success Rate
                                </div>
                              </div>
                            )}
                            {service.duration && (
                              <div>
                                <div className={`text-2xl font-bold ${isEggFreezing ? 'text-white' : 'text-brand-teal'}`}>
                                  {service.duration}
                                </div>
                                <div className={`text-xs ${isEggFreezing ? 'text-white/70' : 'text-gray-500'}`}>
                                  Duration
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className={`flex items-center font-semibold ${
                            isEggFreezing ? 'text-white' : 'text-brand-teal'
                          }`}>
                            Learn more
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Regular Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {regularServices.slice(0, 8).map((service) => {
              const IconComponent = iconMap[service.icon] || FaHeart;
              return (
                <motion.div key={service.id} variants={itemVariants}>
                  <Link to={`/services/${service.slug}`}>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-teal/30 hover:shadow-lg transition-all duration-300 h-full group">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-gradient-to-br from-brand-teal to-brand-coral text-white rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <h3 className="font-heading font-bold text-lg text-gray-900 group-hover:text-brand-teal transition-colors duration-300">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {(service.short_description || service.shortDescription)?.slice(0, 80)}...
                      </p>
                      <div className="flex items-center text-brand-teal text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                        Learn more
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        
        {/* View All Services CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center pt-8"
        >
          <Link 
            to="/services" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-brand-teal to-brand-coral text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            View All Services
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesBento;

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaFlask, FaSnowflake, FaSyringe, FaMale, FaVenus, FaHeart, FaGift, FaUsers } from 'react-icons/fa';
import Section from '../components/common/Section';
import SectionHeader from '../components/common/SectionHeader';
import GradientCard from '../components/common/GradientCard';
import Pill from '../components/common/Pill';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useServices } from '../hooks/useApi';
import { services, serviceCategories } from '../data/services';

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: apiServices, loading, error } = useServices();
  
  // Fallback to mock data if API fails
  const displayServices = apiServices?.length > 0 ? apiServices : services;

  const iconMap = {
    FaFlask: FaFlask,
    FaSnowflake: FaSnowflake,
    FaSyringe: FaSyringe,
    FaMale: FaMale,
    FaVenus: FaVenus,
    FaSearch: FaSearch,
    FaHeart: FaHeart,
    FaGift: FaGift
  };

  const filteredServices = displayServices.filter(service => {
    const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
    const description = service.short_description || service.shortDescription || '';
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Our Services - Loading... | Shashwat IVF</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="xl" />
        </div>
      </>
    );
  }

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <>
      <Helmet>
        <title>Our Services - Comprehensive Fertility & Women's Health | Shashwat IVF</title>
        <meta 
          name="description" 
          content="Explore our comprehensive fertility and women's health services including IVF, ICSI, egg freezing, IUI, andrology, cosmetic gynecology, and advanced embryology." 
        />
        <meta name="keywords" content="IVF services, egg freezing, fertility treatments, women's health, andrology, cosmetic gynecology, embryology" />
      </Helmet>

      {/* Hero Section */}
      <Section background="gradient" padding="xl">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Pill variant="white" className="mb-6">Our Comprehensive Services</Pill>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-brand-ink mb-6">
              Complete Fertility & Women's Health Solutions
            </h1>
            <p className="text-xl md:text-2xl text-brand-muted leading-relaxed">
              From advanced fertility treatments to comprehensive women's healthcare, 
              we offer a full spectrum of services under one roof with personalized care.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Search & Filter */}
      <Section background="white" padding="sm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-brand-tealSoft rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-brand-ink placeholder-brand-muted"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {serviceCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-brand-teal text-white shadow-lg'
                      : 'bg-white text-brand-muted hover:bg-brand-tealSoft hover:text-brand-teal border border-brand-tealSoft'
                  }`}
                >
                  {category}
                  <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                    activeCategory === category
                      ? 'bg-white/20 text-white'
                      : 'bg-brand-tealSoft text-brand-teal'
                  }`}>
                    {category === 'All' ? displayServices.length : displayServices.filter(s => s.category === category).length}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Services Grid */}
      <Section padding="lg">
        <motion.div
          key={`${activeCategory}-${searchTerm}`} // Re-animate when filters change
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || FaHeart; // Fallback icon
            return (
              <motion.div key={service.id} variants={itemVariants}>
                <Link to={`/services/${service.slug}`}>
                  <GradientCard 
                    gradient={service.featured ? (service.title === 'Egg Freezing' ? 'lavender' : 'teal') : 'soft'}
                    className={`h-full p-6 hover:shadow-card-hover transition-all duration-300 ${
                      service.featured && service.title === 'Egg Freezing' ? 'text-white' : 'text-brand-ink'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-3 rounded-2xl ${
                        service.featured && service.title === 'Egg Freezing'
                          ? 'bg-white/20'
                          : service.featured
                          ? 'bg-white/20'
                          : 'bg-brand-tealSoft text-brand-teal'
                      }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        {service.featured && (
                          <Pill 
                            variant={service.title === 'Egg Freezing' ? 'white' : 'white'} 
                            size="sm"
                          >
                            Featured
                          </Pill>
                        )}
                        {service.badge && (
                          <Pill 
                            variant={service.title === 'Egg Freezing' ? 'white' : 'coral'} 
                            size="sm"
                          >
                            {service.badge}
                          </Pill>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="font-heading font-bold text-xl">
                        {service.title}
                      </h3>
                      
                      <p className={`text-sm leading-relaxed ${
                        service.featured && service.title === 'Egg Freezing' 
                          ? 'text-white/90' 
                          : 'text-brand-muted'
                      }`}>
                        {service.shortDescription}
                      </p>

                      {/* Service Details */}
                      <div className="space-y-3">
                        {service.successRate && (
                          <div className="flex items-center justify-between text-sm">
                            <span className={service.featured && service.title === 'Egg Freezing' ? 'text-white/80' : 'text-brand-muted'}>
                              Success Rate
                            </span>
                            <span className="font-semibold">
                              {service.successRate}
                            </span>
                          </div>
                        )}
                        
                        {service.duration && (
                          <div className="flex items-center justify-between text-sm">
                            <span className={service.featured && service.title === 'Egg Freezing' ? 'text-white/80' : 'text-brand-muted'}>
                              Duration
                            </span>
                            <span className="font-semibold">
                              {service.duration}
                            </span>
                          </div>
                        )}

                        {service.idealAge && (
                          <div className="flex items-center justify-between text-sm">
                            <span className={service.featured && service.title === 'Egg Freezing' ? 'text-white/80' : 'text-brand-muted'}>
                              Ideal Age
                            </span>
                            <span className="font-semibold">
                              {service.idealAge}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Category */}
                      <div className="pt-4 border-t border-opacity-20 border-current">
                        <Pill 
                          variant={service.featured && service.title === 'Egg Freezing' ? 'white' : 'default'} 
                          size="sm"
                        >
                          {service.category}
                        </Pill>
                      </div>

                      {/* CTA */}
                      <div className={`text-sm font-medium ${
                        service.featured && service.title === 'Egg Freezing' ? 'text-white' : 'text-brand-teal'
                      }`}>
                        Learn more →
                      </div>
                    </div>
                  </GradientCard>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-heading font-bold text-xl text-brand-ink mb-2">
              No services found
            </h3>
            <p className="text-brand-muted mb-6">
              Try adjusting your search terms or category filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('All');
              }}
              className="px-6 py-3 bg-brand-teal text-white rounded-full font-medium hover:bg-brand-teal/90 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </Section>

      {/* Why Choose Our Services */}
      <Section background="white" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-ink mb-6">
              Why Choose Our Services
            </h2>
            <p className="text-lg text-brand-muted leading-relaxed mb-8">
              Our comprehensive approach combines advanced medical technology with 
              personalized care, ensuring the best possible outcomes for every patient.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GradientCard gradient="soft" className="p-6">
                <FaHeart className="w-8 h-8 text-brand-coral mx-auto mb-4" />
                <h3 className="font-bold text-brand-ink mb-2">Personalized Care</h3>
                <p className="text-brand-muted text-sm">Tailored treatment plans based on individual needs and circumstances</p>
              </GradientCard>
              
              <GradientCard gradient="soft" className="p-6">
                <FaFlask className="w-8 h-8 text-brand-teal mx-auto mb-4" />
                <h3 className="font-bold text-brand-ink mb-2">Advanced Technology</h3>
                <p className="text-brand-muted text-sm">State-of-the-art equipment and latest medical techniques</p>
              </GradientCard>
              
              <GradientCard gradient="soft" className="p-6">
                <FaUsers className="w-8 h-8 text-brand-lavender mx-auto mb-4" />
                <h3 className="font-bold text-brand-ink mb-2">Expert Team</h3>
                <p className="text-brand-muted text-sm">Internationally trained specialists with decades of experience</p>
              </GradientCard>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default ServicesPage;

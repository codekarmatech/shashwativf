import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaClock, FaPercent, FaUsers, FaCalendarAlt, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import Section from '../components/common/Section';
import GradientCard from '../components/common/GradientCard';
import Pill from '../components/common/Pill';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PageError from '../components/common/PageError';
import { PrimaryButton, SecondaryButton } from '../components/common/Button';
import { useService } from '../hooks/useApi';
import { services } from '../data/services';

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const { data: apiService, loading, error } = useService(slug);
  
  // Fallback to mock data if API fails
  const service = apiService || services.find(s => s.slug === slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <PageError 
        message="We couldn't retrieve the details for this service." 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  if (!service) {
    return (
      <Section padding="xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-ink mb-4">Service Not Found</h1>
          <p className="text-brand-muted mb-6">The service you're looking for doesn't exist.</p>
          <Link to="/services" className="text-brand-teal hover:text-brand-ink">
            ← Back to Services
          </Link>
        </div>
      </Section>
    );
  }

  const iconMap = {
    FaFlask: require('react-icons/fa').FaFlask,
    FaSnowflake: require('react-icons/fa').FaSnowflake,
    FaSyringe: require('react-icons/fa').FaSyringe,
    FaMale: require('react-icons/fa').FaMale,
    FaVenus: require('react-icons/fa').FaVenus,
    FaSearch: require('react-icons/fa').FaSearch,
    FaHeart: require('react-icons/fa').FaHeart,
    FaGift: require('react-icons/fa').FaGift
  };

  const IconComponent = iconMap[service.icon] || require('react-icons/fa').FaHeart;

  return (
    <>
      <Helmet>
        <title>{service.title} - Shashwat IVF & Women's Hospital</title>
        <meta name="description" content={service.short_description || service.shortDescription} />
        <meta name="keywords" content={`${service.title}, ${service.category}, fertility treatment, shashwat ivf`} />
      </Helmet>

      {/* Hero Section */}
      <Section background="gradient" padding="md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link 
                to="/services" 
                className="inline-flex items-center text-white/80 hover:text-white transition-colors font-medium"
              >
                <FaArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Link>
            </div>

            <div className="flex items-start space-x-6">
              {/* Icon */}
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <IconComponent className="w-12 h-12 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <Pill variant="white">{service.category}</Pill>
                  {service.featured && <Pill variant="coral">Featured</Pill>}
                  {service.badge && <Pill variant="white">{service.badge}</Pill>}
                </div>
                
                <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">
                  {service.title}
                </h1>
                
                <p className="text-xl text-white/90 leading-relaxed">
                  {service.short_description || service.shortDescription}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Service Header Image */}
      {service.image && (
        <Section padding="sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-48 md:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </div>
        </Section>
      )}

      {/* Service Overview */}
      <Section padding="md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <GradientCard gradient="soft" className="p-8">
                  <h2 className="font-heading font-bold text-2xl text-brand-ink mb-6">
                    About This Treatment
                  </h2>
                  <div className="prose prose-lg text-brand-muted">
                    <p className="mb-4">
                      {service.detailed_description || service.detailedDescription || `${service.title} is a comprehensive fertility treatment offered at Shashwat IVF & Women's Hospital. Our experienced team of specialists uses advanced techniques and state-of-the-art equipment to provide personalized care for each patient.`}
                    </p>
                    <p className="mb-4">
                      We understand that every fertility journey is unique, which is why we take a personalized approach to treatment planning. Our team will work closely with you to develop a treatment plan that addresses your specific needs and circumstances.
                    </p>
                    <p>
                      At Shashwat IVF, we are committed to providing ethical, transparent, and compassionate care throughout your fertility journey. Our NABH-accredited facility ensures the highest standards of safety and quality.
                    </p>
                  </div>
                </GradientCard>
              </motion.div>

              {/* Process Steps */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <GradientCard gradient="soft" className="p-8">
                  <h2 className="font-heading font-bold text-2xl text-brand-ink mb-6">
                    Treatment Process
                  </h2>
                  <div className="space-y-4">
                    {service.processSteps?.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-brand-teal text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-brand-ink mb-1">{step.title}</h3>
                          <p className="text-brand-muted text-sm">{step.description}</p>
                        </div>
                      </div>
                    )) || (
                      // Default process steps
                      <>
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-brand-teal text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                          <div>
                            <h3 className="font-semibold text-brand-ink mb-1">Initial Consultation</h3>
                            <p className="text-brand-muted text-sm">Comprehensive evaluation and medical history review</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-brand-teal text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                          <div>
                            <h3 className="font-semibold text-brand-ink mb-1">Diagnostic Tests</h3>
                            <p className="text-brand-muted text-sm">Necessary tests and evaluations to determine the best approach</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-brand-teal text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                          <div>
                            <h3 className="font-semibold text-brand-ink mb-1">Treatment Planning</h3>
                            <p className="text-brand-muted text-sm">Personalized treatment plan based on your specific needs</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-brand-teal text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                          <div>
                            <h3 className="font-semibold text-brand-ink mb-1">Treatment Execution</h3>
                            <p className="text-brand-muted text-sm">Careful monitoring and execution of the treatment plan</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-brand-teal text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                          <div>
                            <h3 className="font-semibold text-brand-ink mb-1">Follow-up Care</h3>
                            <p className="text-brand-muted text-sm">Ongoing support and monitoring throughout your journey</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </GradientCard>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <GradientCard gradient="soft" className="p-8">
                  <h2 className="font-heading font-bold text-2xl text-brand-ink mb-6">
                    Benefits & Advantages
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.benefits?.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-brand-muted">{benefit}</span>
                      </div>
                    )) || (
                      // Default benefits
                      <>
                        <div className="flex items-start space-x-3">
                          <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-brand-muted">Personalized treatment approach</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-brand-muted">Advanced medical technology</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-brand-muted">Experienced medical team</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-brand-muted">Comprehensive support</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-brand-muted">NABH accredited facility</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-brand-muted">Ethical and transparent care</span>
                        </div>
                      </>
                    )}
                  </div>
                </GradientCard>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <GradientCard gradient="teal" className="p-6 text-white">
                  <h3 className="font-heading font-bold text-lg mb-4">Treatment Details</h3>
                  <div className="space-y-4">
                    {service.successRate && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FaPercent className="w-4 h-4" />
                          <span>Success Rate</span>
                        </div>
                        <span className="font-bold">{service.successRate}</span>
                      </div>
                    )}
                    {service.duration && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FaClock className="w-4 h-4" />
                          <span>Duration</span>
                        </div>
                        <span className="font-bold">{service.duration}</span>
                      </div>
                    )}
                    {service.idealAge && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FaUsers className="w-4 h-4" />
                          <span>Ideal Age</span>
                        </div>
                        <span className="font-bold">{service.idealAge}</span>
                      </div>
                    )}
                  </div>
                </GradientCard>
              </motion.div>

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <GradientCard gradient="soft" className="p-6 text-center">
                  <h3 className="font-heading font-bold text-lg text-brand-ink mb-4">
                    Ready to Start Your Journey?
                  </h3>
                  <p className="text-brand-muted text-sm mb-6">
                    Schedule a consultation with our experts to discuss your treatment options.
                  </p>
                  <div className="space-y-3">
                    <PrimaryButton to="/contact" size="lg" className="w-full" icon={<FaCalendarAlt className="w-4 h-4" />}>
                      Book Consultation
                    </PrimaryButton>
                    <SecondaryButton href="tel:+917567672781" size="lg" className="w-full">
                      Call Now
                    </SecondaryButton>
                  </div>
                </GradientCard>
              </motion.div>

              {/* Important Note */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <GradientCard gradient="coral" className="p-6 text-white">
                  <div className="flex items-start space-x-3">
                    <FaInfoCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Important Note</h4>
                      <p className="text-white/90 text-sm">
                        Treatment plans are personalized based on individual medical history and conditions. 
                        Please consult with our specialists for detailed information about your specific case.
                      </p>
                    </div>
                  </div>
                </GradientCard>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* Related Services */}
      <Section background="white" padding="lg">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-3xl text-brand-ink mb-8 text-center">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services
                .filter(s => s.category === service.category && s.id !== service.id)
                .slice(0, 3)
                .map((relatedService) => {
                  const RelatedIcon = iconMap[relatedService.icon] || require('react-icons/fa').FaHeart;
                  return (
                    <Link key={relatedService.id} to={`/services/${relatedService.slug}`}>
                      <GradientCard gradient="soft" className="p-6 hover:shadow-card-hover transition-all duration-300">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-brand-tealSoft text-brand-teal rounded-xl">
                            <RelatedIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-brand-ink">{relatedService.title}</h3>
                            <Pill variant="default" size="sm">{relatedService.category}</Pill>
                          </div>
                        </div>
                        <p className="text-brand-muted text-sm">
                          {relatedService.shortDescription}
                        </p>
                      </GradientCard>
                    </Link>
                  );
                })}
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default ServiceDetailPage;

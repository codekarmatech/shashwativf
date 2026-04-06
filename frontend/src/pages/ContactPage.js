import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import Section from '../components/common/Section';
import SectionHeader from '../components/common/SectionHeader';
import GradientCard from '../components/common/GradientCard';
import Pill from '../components/common/Pill';
import { PrimaryButton } from '../components/common/Button';
import apiService from '../api/apiService';
import { clinicInfo } from '../data/clinic';
import { services } from '../data/services';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredTime: '',
    preferredService: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Transform form data to match backend field names
      const submitData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        preferred_time: formData.preferredTime,
        preferred_service: formData.preferredService,
        message: formData.message
      };

      await apiService.submitContactForm(submitData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        preferredTime: '',
        preferredService: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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
        <title>Contact Us - Book Consultation | Shashwat IVF & Women's Hospital</title>
        <meta 
          name="description" 
          content="Contact Shashwat IVF & Women's Hospital for fertility consultations. Located in Ahmedabad with phone, email, and online booking options available." 
        />
        <meta name="keywords" content="contact shashwat ivf, book consultation, fertility appointment, ahmedabad hospital contact" />
      </Helmet>

      {/* Hero Section */}
      <Section background="gradient" padding="xl">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Pill variant="white" className="mb-6">Get in Touch</Pill>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-brand-ink mb-6">
              Start Your Journey Today
            </h1>
            <p className="text-xl md:text-2xl text-brand-muted leading-relaxed">
              Ready to take the next step? We're here to answer your questions and 
              guide you through your fertility journey with personalized care and support.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Contact Information & Form */}
      <Section padding="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="font-heading font-bold text-3xl text-brand-ink mb-6">
                Contact Information
              </h2>
              <p className="text-lg text-brand-muted leading-relaxed">
                We're here to help you every step of the way. Reach out to us through 
                any of the following channels, and our team will get back to you promptly.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Phone Numbers */}
              <GradientCard gradient="soft" className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-brand-tealSoft text-brand-teal rounded-2xl">
                    <FaPhone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-brand-ink mb-2">Phone Numbers</h3>
                    <div className="space-y-2 text-brand-muted">
                      <div className="flex justify-between">
                        <span>Front Desk:</span>
                        <a href={`tel:${clinicInfo.contact.phone.frontDesk}`} className="text-brand-teal hover:text-brand-ink font-medium">
                          {clinicInfo.contact.phone.frontDesk}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span>Appointments:</span>
                        <a href={`tel:${clinicInfo.contact.phone.appointments}`} className="text-brand-teal hover:text-brand-ink font-medium">
                          {clinicInfo.contact.phone.appointments}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span>Emergency:</span>
                        <a href={`tel:${clinicInfo.contact.phone.emergency}`} className="text-brand-coral hover:text-brand-ink font-medium">
                          {clinicInfo.contact.phone.emergency}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </GradientCard>

              {/* Email */}
              <GradientCard gradient="soft" className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-brand-coral/10 text-brand-coral rounded-2xl">
                    <FaEnvelope className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-brand-ink mb-2">Email</h3>
                    <div className="space-y-2 text-brand-muted">
                      <div className="flex justify-between">
                        <span>General Inquiries:</span>
                        <a href={`mailto:${clinicInfo.contact.email.general}`} className="text-brand-teal hover:text-brand-ink font-medium">
                          {clinicInfo.contact.email.general}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span>Appointments:</span>
                        <a href={`mailto:${clinicInfo.contact.email.appointments}`} className="text-brand-teal hover:text-brand-ink font-medium">
                          {clinicInfo.contact.email.appointments}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </GradientCard>

              {/* Address */}
              <GradientCard gradient="soft" className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-brand-lavender/10 text-brand-lavender rounded-2xl">
                    <FaMapMarkerAlt className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-brand-ink mb-2">Address</h3>
                    <p className="text-brand-muted">
                      {clinicInfo.contact.address.full}
                    </p>
                    <button className="mt-2 text-brand-teal hover:text-brand-ink font-medium text-sm">
                      View on Map →
                    </button>
                  </div>
                </div>
              </GradientCard>

              {/* Hours */}
              <GradientCard gradient="soft" className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-brand-ink/10 text-brand-ink rounded-2xl">
                    <FaClock className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-brand-ink mb-2">Operating Hours</h3>
                    <div className="space-y-2 text-brand-muted text-sm">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span>{clinicInfo.contact.hours.weekdays}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span>{clinicInfo.contact.hours.saturday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span>{clinicInfo.contact.hours.sunday}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </GradientCard>
            </div>

            {/* Emergency Notice */}
            <GradientCard gradient="coral" className="p-6 text-white">
              <div className="flex items-start space-x-4">
                <FaExclamationTriangle className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Emergency Care</h3>
                  <p className="text-white/90 text-sm">
                    For urgent medical situations, please call our emergency line at{' '}
                    <a href={`tel:${clinicInfo.contact.phone.emergency}`} className="font-bold underline">
                      {clinicInfo.contact.phone.emergency}
                    </a>{' '}
                    or visit our hospital directly.
                  </p>
                </div>
              </div>
            </GradientCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <GradientCard gradient="soft" className="p-8">
              <div className="mb-6">
                <h2 className="font-heading font-bold text-3xl text-brand-ink mb-2">
                  Book a Consultation
                </h2>
                <p className="text-brand-muted">
                  Fill out the form below and we'll get back to you within 24 hours to schedule your appointment.
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="font-medium">Thank you! We'll contact you soon to schedule your consultation.</span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <FaExclamationTriangle className="w-5 h-5 text-red-500" />
                    <span className="font-medium">Sorry, there was an error submitting your form. Please try again or call us directly.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-brand-ink font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-brand-tealSoft rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-ink font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-brand-tealSoft rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-brand-ink font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-brand-tealSoft rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-brand-ink font-medium mb-2">
                      Preferred Time
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-brand-tealSoft rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                    >
                      <option value="">Select preferred time</option>
                      <option value="morning">Morning (9 AM - 12 PM)</option>
                      <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                      <option value="evening">Evening (4 PM - 7 PM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-brand-ink font-medium mb-2">
                      Service of Interest
                    </label>
                    <select
                      name="preferredService"
                      value={formData.preferredService}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-brand-tealSoft rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {services.map(service => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-brand-ink font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-brand-tealSoft rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent resize-none"
                    placeholder="Tell us about your concerns or questions..."
                  />
                </div>

                <PrimaryButton
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                  icon={<FaCalendarAlt className="w-5 h-5" />}
                >
                  {isSubmitting ? 'Submitting...' : 'Book Consultation'}
                </PrimaryButton>

                <p className="text-brand-muted text-sm text-center">
                  By submitting this form, you agree to our privacy policy and consent to being contacted by our team.
                </p>
              </form>
            </GradientCard>
          </motion.div>
        </motion.div>
      </Section>

      {/* Map Section */}
      <Section background="white" padding="lg">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeader
              title="Find Us"
              description="Located in Satellite, Ahmedabad, easily accessible from all parts of the city."
              className="mb-8"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Map */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl overflow-hidden shadow-card">
                  <div className="h-96 bg-gray-200 relative">
                    <iframe
                      src="https://www.openstreetmap.org/export/embed.html?bbox=72.4890%2C23.0225%2C72.4920%2C23.0255&layer=mapnik&marker=23.024%2C72.4905"
                      className="w-full h-full border-0"
                      title="Shashwat IVF Location Map"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="w-4 h-4 text-brand-coral" />
                        <span className="font-semibold text-brand-ink text-sm">Shashwat IVF</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="space-y-6">
                <GradientCard gradient="soft" className="p-6">
                  <h3 className="font-heading font-bold text-lg text-brand-ink mb-4 flex items-center">
                    <FaMapMarkerAlt className="w-5 h-5 mr-2 text-brand-coral" />
                    Location Details
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-brand-ink mb-1">Shashwat IVF Centre Pvt. Ltd.</h4>
                      <p className="text-brand-muted leading-relaxed">
                        2nd Floor, Nilkanth Palace, 'B' Opp.Seema Hall,<br />
                        Anandnagar, Satellite,<br />
                        Ahmedabad - 380015, Gujarat, India
                      </p>
                    </div>
                    <div className="pt-4 border-t border-brand-tealSoft/30">
                      <h4 className="font-semibold text-brand-ink mb-2">Landmarks</h4>
                      <ul className="text-brand-muted space-y-1">
                        <li>• Opposite Seema Hall</li>
                        <li>• Near Anandnagar Road</li>
                        <li>• Satellite Area</li>
                        <li>• Close to SG Highway</li>
                      </ul>
                    </div>
                  </div>
                </GradientCard>

                <GradientCard gradient="teal" className="p-6 text-white">
                  <h3 className="font-heading font-bold text-lg mb-4">
                    Directions
                  </h3>
                  <div className="space-y-3 text-sm">
                    <p className="text-white/90">
                      Located in the heart of Satellite, easily accessible by car, auto-rickshaw, or public transport.
                    </p>
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold">By Car:</span>
                        <p className="text-white/90">Take SG Highway → Satellite → Anandnagar Road</p>
                      </div>
                      <div>
                        <span className="font-semibold">Parking:</span>
                        <p className="text-white/90">Available at Nilkanth Palace</p>
                      </div>
                    </div>
                    <a 
                      href="https://www.google.com/maps/dir/?api=1&destination=23.024,72.4905"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-4 py-2 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-colors"
                    >
                      Get Directions →
                    </a>
                  </div>
                </GradientCard>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default ContactPage;

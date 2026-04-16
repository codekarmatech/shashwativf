import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaCalendarAlt, FaHeart } from 'react-icons/fa';
import { PrimaryButton, SecondaryButton } from '../common/Button';
import { useClinicInfoData } from '../../hooks/useClinicInfoData';

const FinalCTA = () => {
  const { data: clinicInfo } = useClinicInfoData();

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-teal via-brand-teal to-brand-lavender relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-brand-coral/20 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <FaHeart className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              Ready to discuss your options?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Take the first step towards your fertility journey with a personalized consultation 
              from our expert team.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <PrimaryButton 
              size="xl" 
              to="/contact"
              className="bg-brand-coral hover:bg-brand-coral/90 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              icon={<FaCalendarAlt className="w-5 h-5" />}
            >
              Book Consultation
            </PrimaryButton>
            
            <SecondaryButton 
              size="xl"
              href={`tel:${clinicInfo.contact.phone.appointments}`}
              className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white hover:text-brand-teal shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              icon={<FaPhone className="w-5 h-5" />}
            >
              Call Now
            </SecondaryButton>
          </div>

          {/* Contact Info */}
          <div className="pt-8 border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90">
              <div className="space-y-1">
                <div className="font-semibold">Phone</div>
                <div className="text-sm">{clinicInfo.contact.phone.appointments}</div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold">Email</div>
                <div className="text-sm">{clinicInfo.contact.email.general}</div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold">Hours</div>
                <div className="text-sm">{clinicInfo.contact.hours.weekdays}</div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8">
            <div className="flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white/60 rounded-full" />
                <span>NABH Accredited</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white/60 rounded-full" />
                <span>FOGSI Certified Training Centre</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white/60 rounded-full" />
                <span>{clinicInfo.metrics.yearsExperience} Years Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white/60 rounded-full" />
                <span>65% Success Rate</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;

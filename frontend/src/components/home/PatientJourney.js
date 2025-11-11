import React from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaClipboardList, FaFlask, FaBaby } from 'react-icons/fa';
import Stepper from '../common/Stepper';
import SectionHeader from '../common/SectionHeader';

const PatientJourney = () => {
  const journeySteps = [
    {
      title: "First Consultation & Diagnosis",
      description: "Comprehensive evaluation and personalized assessment of your fertility health",
      icon: <FaUserMd className="w-6 h-6" />
    },
    {
      title: "Personalized Treatment Plan",
      description: "Customized treatment protocol designed specifically for your needs and goals",
      icon: <FaClipboardList className="w-6 h-6" />
    },
    {
      title: "Embryology & Procedures",
      description: "Advanced laboratory procedures and treatments using cutting-edge technology",
      icon: <FaFlask className="w-6 h-6" />
    },
    {
      title: "Pregnancy Support & Follow-up",
      description: "Continuous care and support throughout pregnancy and beyond",
      icon: <FaBaby className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Your Fertility Journey with Us"
          description="From your first consultation to holding your baby, we're with you every step of the way with personalized care and support."
          className="mb-16"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Stepper 
            steps={journeySteps}
            orientation="horizontal"
            showNumbers={false}
            className="hidden lg:flex"
          />
          
          {/* Mobile version - vertical */}
          <Stepper 
            steps={journeySteps}
            orientation="vertical"
            showNumbers={false}
            className="lg:hidden"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PatientJourney;

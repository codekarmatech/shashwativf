import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaFlask, FaUserMd, FaGraduationCap } from 'react-icons/fa';
import SectionHeader from '../common/SectionHeader';
import { timeline } from '../../data/clinic';

const WhyShashwat = () => {
  const reasons = [
    {
      id: 1,
      icon: <FaHeart className="w-8 h-8" />,
      title: "Ethical & Transparent Care",
      description: "We believe in honest communication and ethical practices. No over-promising, just genuine care and realistic expectations throughout your fertility journey.",
      color: "coral"
    },
    {
      id: 2,
      icon: <FaFlask className="w-8 h-8" />,
      title: "Advanced IVF Lab & Evidence-Based Protocols",
      description: "State-of-the-art laboratory facilities with cutting-edge technology. Our evidence-based treatment protocols ensure the highest success rates.",
      color: "teal"
    },
    {
      id: 3,
      icon: <FaUserMd className="w-8 h-8" />,
      title: "Holistic Women's Health",
      description: "Beyond fertility treatments, we provide comprehensive women's health services including OB & Gynecology, counselling, and emotional support.",
      color: "lavender"
    },
    {
      id: 4,
      icon: <FaGraduationCap className="w-8 h-8" />,
      title: "Academic & Training Excellence",
      description: "As a FOGSI Certified Training Centre, we maintain the highest standards of medical education and continuously advance our expertise through international collaborations.",
      color: "ink"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const reverseItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const colorClasses = {
    coral: 'text-brand-coral bg-brand-coral/10',
    teal: 'text-brand-teal bg-brand-tealSoft',
    lavender: 'text-brand-lavender bg-brand-lavender/10',
    ink: 'text-brand-ink bg-brand-ink/10'
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Why Choose Shashwat IVF"
          description="Our commitment to excellence, ethics, and comprehensive care sets us apart in fertility treatment and women's health."
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16 lg:space-y-24"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              variants={index % 2 === 0 ? itemVariants : reverseItemVariants}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-8 lg:gap-16`}
            >
              {/* Icon & Visual */}
              <div className="flex-shrink-0">
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center ${colorClasses[reason.color]}`}>
                  {reason.icon}
                </div>
              </div>

              {/* Content */}
              <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'} text-center`}>
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-brand-ink mb-4">
                  {reason.title}
                </h3>
                <p className="text-lg text-brand-muted leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 lg:mt-24"
        >
          <h3 className="font-heading font-bold text-xl text-brand-ink text-center mb-8">
            Our Journey of Excellence
          </h3>
          
          <div className="overflow-x-auto pb-4">
            <div className="relative min-w-[840px]">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-brand-tealSoft transform -translate-y-1/2" />
              
              {/* Timeline Items */}
              <div className="flex justify-between items-center gap-6 relative">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center max-w-32"
                  >
                    <div className="w-4 h-4 bg-brand-teal rounded-full mb-3 relative z-10" />
                    <div className="text-sm font-bold text-brand-teal mb-1">
                      {item.year}
                    </div>
                    <div className="text-xs text-brand-muted leading-tight">
                      {item.event}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyShashwat;

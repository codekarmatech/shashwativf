import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaMapMarkerAlt, FaHeart, FaGraduationCap, FaAward } from 'react-icons/fa';
import MetricCard from '../common/MetricCard';
import { clinicInfo } from '../../data/clinic';

const ImpactMetrics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const metrics = [
    {
      id: 1,
      value: clinicInfo.metrics.townsReached,
      label: "Towns Reached",
      description: "Diagnostic & surgery camps across Gujarat & Rajasthan",
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      color: "teal",
      countTo: 91
    },
    {
      id: 2,
      value: clinicInfo.metrics.livesImpacted,
      label: "Lives Impacted",
      description: "Beneficiaries in the last 2 years",
      icon: <FaHeart className="w-6 h-6" />,
      color: "coral",
      countTo: 20000
    },
    {
      id: 3,
      value: "FOGSI Training Centre",
      label: "Academic Excellence",
      description: "Certified training centre for gynecologists",
      icon: <FaGraduationCap className="w-6 h-6" />,
      color: "lavender",
      countTo: null
    },
    {
      id: 4,
      value: "NABH Accredited",
      label: "Quality Standards",
      description: "IVF centre with highest quality standards",
      icon: <FaAward className="w-6 h-6" />,
      color: "ink",
      countTo: null
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-ink mb-4">
            Making a Difference Across Communities
          </h2>
          <p className="text-lg text-brand-muted max-w-3xl mx-auto">
            Our commitment extends beyond the clinic walls, reaching communities across states 
            and touching thousands of lives through our outreach programs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {metrics.map((metric, index) => (
            <div key={metric.id} className="h-full">
              <AnimatedMetricCard 
                metric={metric}
                delay={index * 0.1}
                isInView={isInView}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AnimatedMetricCard = ({ metric, delay, isInView }) => {
  const [displayValue, setDisplayValue] = useState(metric.countTo ? 0 : metric.value);

  useEffect(() => {
    if (isInView && metric.countTo) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = metric.countTo / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= metric.countTo) {
          setDisplayValue(metric.value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current).toLocaleString() + '+');
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, metric.countTo, metric.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="h-full"
    >
      <MetricCard
        value={displayValue}
        label={metric.label}
        description={metric.description}
        icon={metric.icon}
        color={metric.color}
        animated={false}
        className="h-full"
      />
    </motion.div>
  );
};

export default ImpactMetrics;

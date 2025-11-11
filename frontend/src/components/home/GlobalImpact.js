import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaMapMarkerAlt, FaUsers, FaHeart } from 'react-icons/fa';
import GradientCard from '../common/GradientCard';
import Pill from '../common/Pill';
import SectionHeader from '../common/SectionHeader';
import { impactData } from '../../data/clinic';

const GlobalImpact = () => {
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
    <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-tealSoft via-white to-brand-lavender/10 relative overflow-hidden">
      {/* Background Map Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
          {/* Simplified India map outline */}
          <path 
            d="M200 150 L250 120 L300 140 L350 130 L400 150 L450 180 L480 220 L470 280 L450 340 L420 380 L380 420 L340 450 L300 460 L260 450 L220 420 L180 380 L160 340 L150 300 L160 250 L180 200 Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
          {/* Gujarat region highlight */}
          <circle cx="220" cy="280" r="8" fill="currentColor" />
          {/* Rajasthan region highlight */}
          <circle cx="280" cy="240" r="8" fill="currentColor" />
          {/* International locations */}
          <circle cx="600" cy="200" r="6" fill="currentColor" />
          <circle cx="650" cy="350" r="6" fill="currentColor" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Global & Social Impact"
          description="Extending our care beyond borders, reaching communities across states and countries with our medical expertise and compassionate service."
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Local Impact */}
          <motion.div variants={itemVariants}>
            <GradientCard gradient="soft" className="h-full p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-2xl bg-brand-tealSoft text-brand-teal mr-4">
                  <FaMapMarkerAlt className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-2xl text-brand-ink">
                    Regional Outreach
                  </h3>
                  <p className="text-brand-muted">Gujarat & Rajasthan</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-2xl">
                    <div className="text-3xl font-bold text-brand-teal mb-1">
                      {impactData.camps.total}+
                    </div>
                    <div className="text-sm text-brand-muted">Towns Reached</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-2xl">
                    <div className="text-3xl font-bold text-brand-coral mb-1">
                      {impactData.camps.beneficiaries.toLocaleString()}+
                    </div>
                    <div className="text-sm text-brand-muted">Lives Impacted</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-brand-ink mb-3">Camp Types</h4>
                  <div className="flex flex-wrap gap-2">
                    {impactData.camps.types.map((type, index) => (
                      <Pill key={index} variant="teal" size="sm">
                        {type}
                      </Pill>
                    ))}
                  </div>
                </div>

                <p className="text-brand-muted">
                  Over the past {impactData.camps.timeframe}, our dedicated team has conducted 
                  comprehensive medical camps across {impactData.camps.states.join(' and ')}, 
                  bringing quality healthcare to underserved communities.
                </p>
              </div>
            </GradientCard>
          </motion.div>

          {/* International Impact */}
          <motion.div variants={itemVariants}>
            <GradientCard gradient="lavender" className="h-full p-8 text-white">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-2xl bg-white/20 mr-4">
                  <FaGlobe className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-2xl">
                    International Missions
                  </h3>
                  <p className="text-white/90">Global Healthcare Initiatives</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* International Countries */}
                <div className="grid grid-cols-2 gap-4">
                  {impactData.international.countries.map((country, index) => (
                    <div key={index} className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
                      <div className="text-lg font-bold mb-1">{country}</div>
                      <div className="text-sm text-white/80">Medical Mission</div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Activities</h4>
                  <div className="space-y-2">
                    {impactData.international.activities.map((activity, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <FaHeart className="w-3 h-3 mr-2 text-white/80" />
                        {activity}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Training & Conferences</h4>
                  <div className="flex flex-wrap gap-2">
                    {impactData.training.internationalFaculty.map((location, index) => (
                      <Pill key={index} variant="white" size="sm">
                        {location}
                      </Pill>
                    ))}
                  </div>
                </div>
              </div>
            </GradientCard>
          </motion.div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-8 bg-white rounded-3xl p-6 shadow-card">
            <div className="flex items-center space-x-3">
              <FaUsers className="w-6 h-6 text-brand-teal" />
              <div>
                <div className="text-2xl font-bold text-brand-ink">
                  {impactData.camps.beneficiaries.toLocaleString()}+
                </div>
                <div className="text-sm text-brand-muted">Total Beneficiaries</div>
              </div>
            </div>
            <div className="w-px h-12 bg-brand-tealSoft" />
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="w-6 h-6 text-brand-coral" />
              <div>
                <div className="text-2xl font-bold text-brand-ink">
                  {impactData.camps.total + impactData.international.countries.length}+
                </div>
                <div className="text-sm text-brand-muted">Locations Served</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalImpact;

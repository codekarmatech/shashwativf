import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaAward, FaGraduationCap, FaGlobe } from 'react-icons/fa';
import GradientCard from '../common/GradientCard';
import Pill from '../common/Pill';
import SectionHeader from '../common/SectionHeader';
import { useLeaders } from '../../hooks/useApi';
import { formatDoctorName } from '../../utils/doctors';

const LeadersSection = () => {
  const { data: leaders, loading } = useLeaders();
  const displayLeaders = leaders || [];

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

  const getHighlightIcon = (highlight) => {
    if (highlight.includes('Gold') || highlight.includes('Medal')) return <FaAward className="w-4 h-4" />;
    if (highlight.includes('FICOG') || highlight.includes('Training')) return <FaGraduationCap className="w-4 h-4" />;
    if (highlight.includes('International') || highlight.includes('USA')) return <FaGlobe className="w-4 h-4" />;
    return null;
  };

  const getHighlightColor = (highlight) => {
    if (highlight.includes('Gold') || highlight.includes('Medal')) return 'coral';
    if (highlight.includes('FICOG')) return 'lavender';
    if (highlight.includes('International') || highlight.includes('USA')) return 'teal';
    return 'default';
  };

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-tealSoft via-white to-brand-lavender/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Meet Our Leaders"
            description="Internationally recognized experts leading the way in fertility treatment and women's health with decades of combined experience."
            className="mb-16"
          />
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!displayLeaders.length) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-tealSoft via-white to-brand-lavender/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Meet Our Leaders"
          description="Internationally recognized experts leading the way in fertility treatment and women's health with decades of combined experience."
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {displayLeaders.map((leader, index) => (
            <motion.div key={leader.id} variants={itemVariants}>
              {(() => {
                const displayName = formatDoctorName(leader.name);

                return (
              <GradientCard 
                gradient="soft" 
                className="p-8 lg:p-12"
              >
                <div className="flex flex-col lg:flex-row items-start gap-12">
                  {/* Avatar & Basic Info */}
                  <div className="flex-shrink-0 text-center lg:text-left">
                    <div className="w-72 h-72 mx-auto lg:mx-0 rounded-3xl bg-gradient-to-br from-brand-teal to-brand-lavender text-white flex items-center justify-center text-6xl font-bold mb-6 shadow-2xl relative overflow-hidden">
                      {leader.photo ? (
                        <img 
                          src={leader.photo} 
                          alt={displayName} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to initials if image fails to load
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`absolute inset-0 bg-gradient-to-br from-brand-teal/80 to-brand-lavender/80 flex items-center justify-center ${leader.photo ? 'hidden' : ''}`}>
                        <span className="text-white font-bold text-5xl">
                          {leader.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 text-center lg:text-left">
                      {leader.experience && (
                        <div className="text-lg font-semibold text-brand-ink">
                          {leader.experience}
                        </div>
                      )}
                      {leader.qualifications && (
                        <div className="text-base text-brand-muted font-medium">
                          {leader.qualifications}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="font-heading font-bold text-2xl md:text-3xl text-brand-ink mb-2">
                        {displayName}
                      </h3>
                      <p className="text-brand-muted font-medium mb-3">
                        {leader.designation}
                      </p>
                      <p className="text-sm text-brand-teal font-semibold">
                        {leader.qualifications}
                      </p>
                    </div>

                    {/* Highlights */}
                    {leader.highlights && leader.highlights.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-brand-ink mb-3">Key Highlights</h4>
                        <div className="flex flex-wrap gap-2">
                          {leader.highlights.slice(0, 3).map((highlight, idx) => (
                            <Pill 
                              key={idx}
                              variant={getHighlightColor(highlight)}
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              {getHighlightIcon(highlight)}
                              <span>{highlight}</span>
                            </Pill>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Specialties */}
                    {leader.specialties && leader.specialties.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-brand-ink mb-3">Areas of Expertise</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {leader.specialties.map((specialty, idx) => (
                            <div key={idx} className="flex items-center text-sm text-brand-muted">
                              <div className="w-2 h-2 bg-brand-teal rounded-full mr-2" />
                              {specialty}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quote */}
                    <blockquote className="border-l-4 border-brand-teal pl-4 mb-6">
                      <p className="text-brand-ink italic font-medium">
                        "{leader.quote}"
                      </p>
                    </blockquote>

                    {/* CTA */}
                    <Link
                      to="/about/leaders"
                      className="inline-flex items-center text-brand-teal hover:text-brand-ink font-medium text-sm transition-colors duration-200"
                    >
                      View full profile
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </GradientCard>
                );
              })()}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LeadersSection;

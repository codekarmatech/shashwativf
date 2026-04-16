import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaAward, FaGraduationCap, FaGlobe, FaMedal, FaUserMd } from 'react-icons/fa';
import Section from '../components/common/Section';
import GradientCard from '../components/common/GradientCard';
import Pill from '../components/common/Pill';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PageError from '../components/common/PageError';
import { useLeaders } from '../hooks/useApi';
import { FaHeart } from 'react-icons/fa';
import { formatDoctorName } from '../utils/doctors';

const LeadersPage = () => {
  const { data: leaders, loading, error } = useLeaders();
  const displayLeaders = leaders || [];

  const getHighlightIcon = (highlight) => {
    if (highlight.includes('Gold') || highlight.includes('Medal')) return <FaMedal className="w-4 h-4" />;
    if (highlight.includes('FICOG') || highlight.includes('Training')) return <FaGraduationCap className="w-4 h-4" />;
    if (highlight.includes('International') || highlight.includes('USA')) return <FaGlobe className="w-4 h-4" />;
    return <FaAward className="w-4 h-4" />;
  };

  const getHighlightColor = (highlight) => {
    if (highlight.includes('Gold') || highlight.includes('Medal')) return 'coral';
    if (highlight.includes('FICOG')) return 'lavender';
    if (highlight.includes('International') || highlight.includes('USA')) return 'teal';
    return 'default';
  };

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Our Leaders - Expert Fertility Specialists | Shashwat IVF & Women's Hospital</title>
          <meta name="description" content="Loading our expert team..." />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="xl" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Error - Our Leaders | Shashwat IVF</title>
        </Helmet>
        <PageError 
          message="We couldn't load the leadership team profiles." 
          onRetry={() => window.location.reload()} 
        />
      </>
    );
  }

  if (!displayLeaders.length) {
    return (
      <>
        <Helmet>
          <title>Our Leaders - Expert Fertility Specialists | Shashwat IVF & Women's Hospital</title>
        </Helmet>
        <Section padding="xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-brand-ink mb-4">Leaders Not Available</h1>
            <p className="text-brand-muted">Leadership profiles have not been published yet.</p>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Our Leaders - Expert Fertility Specialists | Shashwat IVF & Women's Hospital</title>
        <meta 
          name="description" 
          content="Meet our internationally recognized fertility specialists - Dr. Shital Punjabi (Gold Medalist, FICOG, USA ART Specialist), Dr. Rajesh Punjabi, and Dr. Trishala Punjabi." 
        />
        <meta name="keywords" content="Dr Shital Punjabi, Dr Rajesh Punjabi, fertility specialists ahmedabad, IVF doctors, FICOG, gold medalist gynecologist" />
      </Helmet>

      {/* Hero Section */}
      <Section background="gradient" padding="xl">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Pill variant="white" className="mb-6">Our Medical Leaders</Pill>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-brand-ink mb-6">
              Internationally Recognized Excellence
            </h1>
            <p className="text-xl md:text-2xl text-brand-muted leading-relaxed">
              Meet the visionary leaders who have shaped Shashwat IVF into a center of excellence, 
              combining decades of expertise with compassionate care.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Leaders Profiles */}
      <Section padding="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {displayLeaders.map((leader, index) => (
            <motion.div key={leader.id} variants={itemVariants}>
              {(() => {
                const displayName = formatDoctorName(leader.name);
                const yearsCount = leader.yearsCount || (displayName.includes('Shital Punjabi') || displayName.includes('Rajesh Punjabi') ? '30+' : leader.experience);
                const procedureCount = leader.procedureCount || (displayName.includes('Shital Punjabi') || displayName.includes('Rajesh Punjabi') ? '5000+' : '1000+');

                return (
              <GradientCard gradient="soft" className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                  {/* Profile Image & Basic Info */}
                  <div className="lg:col-span-1">
                    <div className="text-center lg:text-left">
                      {/* Avatar */}
                      <div className="w-48 h-48 mx-auto lg:mx-0 rounded-3xl bg-gradient-to-br from-brand-teal to-brand-lavender text-white flex items-center justify-center text-4xl font-bold mb-6 shadow-xl relative overflow-hidden">
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
                          <span className="text-white font-bold text-4xl">
                            {leader.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      
                      {/* Basic Info */}
                      <div className="space-y-3">
                        {leader.profileLabel && (
                          <div className="inline-flex items-center rounded-full border border-brand-teal/15 bg-white/90 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-teal shadow-sm shadow-brand-teal/5">
                            {leader.profileLabel}
                          </div>
                        )}
                        <h2 className="font-heading font-bold text-3xl text-brand-ink">
                          {displayName}
                        </h2>
                        <p className="text-brand-muted font-medium text-lg">
                          {leader.designation}
                        </p>
                        <div className="text-brand-teal font-semibold">
                          {leader.experience} Experience
                        </div>
                      </div>

                      {/* Key Stats */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                          <div className="text-2xl font-bold text-brand-teal">{yearsCount}</div>
                          <div className="text-xs text-brand-muted">Years</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                          <div className="text-2xl font-bold text-brand-coral">{procedureCount}</div>
                          <div className="text-xs text-brand-muted">Procedures</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Information */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Qualifications */}
                    <div>
                      <h3 className="font-heading font-bold text-xl text-brand-ink mb-4 flex items-center">
                        <FaGraduationCap className="w-5 h-5 mr-3 text-brand-teal" />
                        Qualifications & Credentials
                      </h3>
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <p className="text-brand-teal font-semibold text-lg mb-4">
                          {leader.qualifications}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {leader.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center space-x-3 p-3 bg-brand-tealSoft/30 rounded-xl">
                              <div className={`p-2 rounded-lg ${
                                getHighlightColor(highlight) === 'coral' ? 'bg-brand-coral/10 text-brand-coral' :
                                getHighlightColor(highlight) === 'lavender' ? 'bg-brand-lavender/10 text-brand-lavender' :
                                'bg-brand-teal/10 text-brand-teal'
                              }`}>
                                {getHighlightIcon(highlight)}
                              </div>
                              <span className="text-brand-ink font-medium text-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Areas of Expertise */}
                    <div>
                      <h3 className="font-heading font-bold text-xl text-brand-ink mb-4 flex items-center">
                        <FaUserMd className="w-5 h-5 mr-3 text-brand-teal" />
                        Areas of Expertise
                      </h3>
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {leader.specialties.map((specialty, idx) => (
                            <div key={idx} className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-brand-teal rounded-full" />
                              <span className="text-brand-ink font-medium">{specialty}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Biography */}
                    <div>
                      <h3 className="font-heading font-bold text-xl text-brand-ink mb-4">
                        Professional Journey
                      </h3>
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <p className="text-brand-muted leading-relaxed mb-6">
                          {leader.bio}
                        </p>
                        
                        {/* Quote */}
                        <blockquote className="border-l-4 border-brand-teal pl-6 py-4 bg-brand-tealSoft/20 rounded-r-xl">
                          <p className="text-brand-ink font-medium italic text-lg">
                            "{leader.quote}"
                          </p>
                          <footer className="text-brand-muted text-sm mt-2">
                            - {displayName}
                          </footer>
                        </blockquote>
                      </div>
                    </div>

                    {/* Special Recognition */}
                    {displayName.includes('Shital') && (
                      <div>
                        <h3 className="font-heading font-bold text-xl text-brand-ink mb-4 flex items-center">
                          <FaAward className="w-5 h-5 mr-3 text-brand-coral" />
                          Special Recognition
                        </h3>
                        <div className="bg-gradient-to-r from-brand-coral/10 to-brand-lavender/10 rounded-2xl p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-brand-ink mb-2">Academic Excellence</h4>
                              <ul className="space-y-2 text-sm text-brand-muted">
                                <li>• Gold in D.G.O. + M.D.</li>
                                <li>• FICOG Certification</li>
                                <li>• ART Specialist Training (USA)</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-brand-ink mb-2">International Faculty</h4>
                              <ul className="space-y-2 text-sm text-brand-muted">
                                <li>• Conference Speaker (Bangladesh, Nepal)</li>
                                <li>• Medical Missions (Tanzania, Madagascar)</li>
                                <li>• Training Programs (Sri Lanka)</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </GradientCard>
                );
              })()}
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Leadership Philosophy */}
      <Section background="white" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-ink mb-6">
              Leadership Philosophy
            </h2>
            <p className="text-lg text-brand-muted leading-relaxed mb-8">
              Our leaders believe that excellence in medicine comes from combining cutting-edge 
              technology with genuine compassion. Every patient is treated not just as a case, 
              but as a family member deserving of the highest quality care and emotional support.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GradientCard gradient="soft" className="p-6 text-center">
                <FaHeart className="w-8 h-8 text-brand-coral mx-auto mb-4" />
                <h3 className="font-bold text-brand-ink mb-2">Compassionate Care</h3>
                <p className="text-brand-muted text-sm">Every patient receives personalized attention and emotional support</p>
              </GradientCard>
              
              <GradientCard gradient="soft" className="p-6 text-center">
                <FaGraduationCap className="w-8 h-8 text-brand-teal mx-auto mb-4" />
                <h3 className="font-bold text-brand-ink mb-2">Continuous Learning</h3>
                <p className="text-brand-muted text-sm">Staying updated with latest advances in reproductive medicine</p>
              </GradientCard>
              
              <GradientCard gradient="soft" className="p-6 text-center">
                <FaGlobe className="w-8 h-8 text-brand-lavender mx-auto mb-4" />
                <h3 className="font-bold text-brand-ink mb-2">Global Standards</h3>
                <p className="text-brand-muted text-sm">Maintaining international quality standards in all treatments</p>
              </GradientCard>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default LeadersPage;

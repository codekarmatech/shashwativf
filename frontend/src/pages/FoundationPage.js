import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaHeart, FaUsers, FaGlobe, FaHandHoldingHeart, FaStethoscope } from 'react-icons/fa';
import Section from '../components/common/Section';
import SectionHeader from '../components/common/SectionHeader';
import GradientCard from '../components/common/GradientCard';
import MetricCard from '../components/common/MetricCard';
import Pill from '../components/common/Pill';
import { impactData } from '../data/clinic';

const FoundationPage = () => {
  const campTypes = [
    {
      icon: <FaStethoscope className="w-8 h-8" />,
      title: "Diagnostic Camps",
      description: "Comprehensive health screenings and early detection programs in rural areas",
      stats: "45+ camps conducted",
      color: "teal"
    },
    {
      icon: <FaHandHoldingHeart className="w-8 h-8" />,
      title: "Surgery Camps",
      description: "Free surgical procedures for women's health conditions in underserved communities",
      stats: "30+ surgeries performed",
      color: "coral"
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Awareness Programs",
      description: "Educational sessions on reproductive health and family planning",
      stats: "16+ awareness sessions",
      color: "lavender"
    }
  ];

  const impactStories = [
    {
      location: "Kutch District, Gujarat",
      beneficiaries: "500+ women",
      services: "Gynecological screenings, fertility consultations",
      impact: "Early detection of reproductive health issues in remote villages"
    },
    {
      location: "Banaskantha, Gujarat", 
      beneficiaries: "300+ families",
      services: "Family planning education, contraceptive guidance",
      impact: "Improved awareness about reproductive choices and health"
    },
    {
      location: "Jodhpur, Rajasthan",
      beneficiaries: "400+ women",
      services: "Cervical cancer screening, treatment referrals",
      impact: "Life-saving early detection and treatment coordination"
    }
  ];

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
        <title>Shashwat Foundation - Social Impact & Community Outreach | Shashwat IVF</title>
        <meta 
          name="description" 
          content="Discover Shashwat Foundation's social impact through 91+ medical camps across Gujarat & Rajasthan, reaching 20,000+ lives with healthcare services and awareness programs." 
        />
        <meta name="keywords" content="shashwat foundation, medical camps gujarat, healthcare outreach, social impact, community health programs" />
      </Helmet>

      {/* Hero Section */}
      <Section background="gradient" padding="xl">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Pill variant="white" className="mb-6">Shashwat Foundation & Social Initiatives</Pill>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-brand-ink mb-6">
              Extending Care Beyond Boundaries
            </h1>
            <p className="text-xl md:text-2xl text-brand-muted leading-relaxed">
              Our commitment to healthcare extends far beyond our hospital walls, reaching 
              underserved communities across Gujarat and Rajasthan with life-changing medical services.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Impact Overview */}
      <Section background="white" padding="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <motion.div variants={itemVariants}>
            <MetricCard
              value={`${impactData.camps.total}+`}
              label="Towns Reached"
              description="Across Gujarat & Rajasthan"
              icon={<FaMapMarkerAlt className="w-6 h-6" />}
              color="teal"
              animated={false}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <MetricCard
              value={`${impactData.camps.beneficiaries.toLocaleString()}+`}
              label="Lives Impacted"
              description="In the last 2 years"
              icon={<FaHeart className="w-6 h-6" />}
              color="coral"
              animated={false}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <MetricCard
              value="3"
              label="Camp Types"
              description="Diagnostic, Surgery, Awareness"
              icon={<FaUsers className="w-6 h-6" />}
              color="lavender"
              animated={false}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <MetricCard
              value="2"
              label="International Missions"
              description="Tanzania & Madagascar"
              icon={<FaGlobe className="w-6 h-6" />}
              color="ink"
              animated={false}
            />
          </motion.div>
        </motion.div>
      </Section>

      {/* Our Mission */}
      <Section background="gradient" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-ink mb-6">
              Healthcare is a Right, Not a Privilege
            </h2>
            <div className="space-y-4 text-lg text-brand-muted leading-relaxed">
              <p>
                The Shashwat Foundation was born from our belief that quality healthcare 
                should be accessible to everyone, regardless of their geographical location 
                or economic status.
              </p>
              <p>
                Through our comprehensive outreach programs, we bring advanced medical 
                expertise directly to rural communities, conducting free diagnostic camps, 
                surgical procedures, and health awareness sessions.
              </p>
              <p>
                Our mission extends beyond treatment to education, empowering communities 
                with knowledge about reproductive health, family planning, and preventive care.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GradientCard gradient="soft" className="p-8">
              <h3 className="font-heading font-bold text-xl text-brand-ink mb-6">
                Our Core Principles
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-brand-teal rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-ink">Accessibility</h4>
                    <p className="text-brand-muted text-sm">Bringing healthcare to remote locations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-brand-coral rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-ink">Quality</h4>
                    <p className="text-brand-muted text-sm">Maintaining the same standards as our hospital</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-brand-lavender rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-ink">Education</h4>
                    <p className="text-brand-muted text-sm">Empowering communities with health knowledge</p>
                  </div>
                </div>
              </div>
            </GradientCard>
          </motion.div>
        </div>
      </Section>

      {/* Camp Types */}
      <Section background="white" padding="lg">
        <SectionHeader
          title="Our Outreach Programs"
          description="Comprehensive healthcare services delivered directly to communities in need."
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {campTypes.map((camp, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GradientCard gradient="soft" className="h-full p-8 text-center">
                <div className={`inline-flex p-4 rounded-2xl mb-6 ${
                  camp.color === 'teal' ? 'bg-brand-tealSoft text-brand-teal' :
                  camp.color === 'coral' ? 'bg-brand-coral/10 text-brand-coral' :
                  'bg-brand-lavender/10 text-brand-lavender'
                }`}>
                  {camp.icon}
                </div>
                
                <h3 className="font-heading font-bold text-xl text-brand-ink mb-4">
                  {camp.title}
                </h3>
                
                <p className="text-brand-muted mb-6 leading-relaxed">
                  {camp.description}
                </p>
                
                <Pill variant={camp.color} size="sm">
                  {camp.stats}
                </Pill>
              </GradientCard>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Impact Stories */}
      <Section background="gradient" padding="lg">
        <SectionHeader
          title="Stories of Impact"
          description="Real communities, real change. See how our outreach programs have transformed lives across Gujarat and Rajasthan."
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {impactStories.map((story, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GradientCard gradient="soft" className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-brand-ink mb-2">
                      {story.location}
                    </h3>
                    <Pill variant="teal" size="sm">
                      <FaMapMarkerAlt className="w-3 h-3 mr-1" />
                      Location
                    </Pill>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-bold text-brand-coral mb-1">
                      {story.beneficiaries}
                    </div>
                    <div className="text-brand-muted text-sm">Beneficiaries</div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-brand-ink mb-2">Services Provided</h4>
                    <p className="text-brand-muted text-sm">{story.services}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-brand-ink mb-2">Impact</h4>
                    <p className="text-brand-muted text-sm">{story.impact}</p>
                  </div>
                </div>
              </GradientCard>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* International Missions */}
      <Section background="white" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-ink mb-6">
              Global Healthcare Missions
            </h2>
            <p className="text-lg text-brand-muted leading-relaxed mb-8">
              Our commitment to healthcare extends beyond national borders. We've conducted 
              medical missions in Tanzania and Madagascar, providing essential healthcare 
              services and training local medical professionals.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <GradientCard gradient="teal" className="p-8 text-white">
                <FaGlobe className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-heading font-bold text-xl mb-4">Tanzania Mission</h3>
                <p className="text-white/90 mb-4">
                  Provided fertility treatments and gynecological care to underserved 
                  communities in Dar es Salaam region.
                </p>
                <div className="text-sm text-white/80">
                  200+ patients treated • 50+ procedures • Training for 20 local doctors
                </div>
              </GradientCard>
              
              <GradientCard gradient="lavender" className="p-8 text-white">
                <FaHeart className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-heading font-bold text-xl mb-4">Madagascar Initiative</h3>
                <p className="text-white/90 mb-4">
                  Women's health awareness programs and basic gynecological care 
                  in rural communities of Antananarivo.
                </p>
                <div className="text-sm text-white/80">
                  300+ women screened • 15 awareness sessions • Medical supplies donated
                </div>
              </GradientCard>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Get Involved */}
      <Section background="gradient" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-ink mb-6">
              Join Our Mission
            </h2>
            <p className="text-lg text-brand-muted leading-relaxed mb-8">
              Be part of our journey to make healthcare accessible to all. Whether through 
              volunteering, partnerships, or support, every contribution makes a difference.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GradientCard gradient="soft" className="p-6">
                <FaUsers className="w-8 h-8 text-brand-teal mx-auto mb-4" />
                <h3 className="font-bold text-brand-ink mb-2">Volunteer</h3>
                <p className="text-brand-muted text-sm">Join our medical camps as a healthcare volunteer</p>
              </GradientCard>
              
              <GradientCard gradient="soft" className="p-6">
                <FaHandHoldingHeart className="w-8 h-8 text-brand-coral mx-auto mb-4" />
                <h3 className="font-bold text-brand-ink mb-2">Partner</h3>
                <p className="text-brand-muted text-sm">Collaborate with us on community health initiatives</p>
              </GradientCard>
              
              <GradientCard gradient="soft" className="p-6">
                <FaHeart className="w-8 h-8 text-brand-lavender mx-auto mb-4" />
                <h3 className="font-bold text-brand-ink mb-2">Support</h3>
                <p className="text-brand-muted text-sm">Help us reach more communities in need</p>
              </GradientCard>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default FoundationPage;

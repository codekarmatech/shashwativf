import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaAward, FaHeart, FaGraduationCap, FaGlobe } from 'react-icons/fa';
import Section from '../components/common/Section';
import SectionHeader from '../components/common/SectionHeader';
import GradientCard from '../components/common/GradientCard';
import MetricCard from '../components/common/MetricCard';
import Pill from '../components/common/Pill';
import { PrimaryButton } from '../components/common/Button';
import { timeline } from '../data/clinic';
import { useClinicInfoData } from '../hooks/useClinicInfoData';

const AboutPage = () => {
  const { data: clinicInfo } = useClinicInfoData();
  const values = [
    {
      icon: <FaHeart className="w-8 h-8" />,
      title: "Ethical & Transparent Care",
      description: "We believe in honest communication, realistic expectations, and ethical practices in all our treatments."
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      title: "Clinical Excellence",
      description: "NABH accreditation and FOGSI certification ensure we maintain the highest standards of medical care."
    },
    {
      icon: <FaGraduationCap className="w-8 h-8" />,
      title: "Continuous Learning",
      description: "As a training centre, we stay at the forefront of medical advances and share knowledge globally."
    },
    {
      icon: <FaGlobe className="w-8 h-8" />,
      title: "Global Impact",
      description: "Our reach extends beyond borders, touching lives across states and countries through our outreach programs."
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
        <title>About Us - Shashwat IVF & Women's Hospital | NABH Accredited Fertility Center</title>
        <meta
          name="description"
          content="Learn about Shashwat IVF & Women's Hospital - NABH accredited fertility center and FOGSI certified training centre with decades of excellence in reproductive medicine."
        />
        <meta name="keywords" content="about shashwat ivf, fertility hospital ahmedabad, NABH accredited, FOGSI training centre, Dr Shital Punjabi" />
      </Helmet>

      {/* Hero Section */}
      <Section background="gradient" padding="xl">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Pill variant="white" className="mb-6">About Shashwat IVF & Women's Hospital</Pill>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-brand-ink mb-6">
              Nurturing Dreams, Creating Families
            </h1>
            <p className="text-xl md:text-2xl text-brand-muted leading-relaxed">
              Since 1997, we've been at the forefront of fertility treatment and women's healthcare,
              combining advanced medical expertise with compassionate care.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Hospital Overview */}
      <Section padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-ink mb-6">
              Excellence in Reproductive Medicine
            </h2>
            <div className="space-y-4 text-lg text-brand-muted leading-relaxed">
              <p>
                Shashwat IVF & Women's Hospital stands as a beacon of hope for couples seeking
                fertility treatment in Gujarat and beyond. Our NABH-accredited facility combines
                state-of-the-art technology with personalized care to deliver exceptional outcomes.
              </p>
              <p>
                As a FOGSI Certified Training Centre for Gynecologists, we not only provide
                world-class treatment but also contribute to advancing medical education and
                research in reproductive medicine.
              </p>
              <p>
                Our comprehensive approach encompasses not just fertility treatments, but complete
                women's health services, ensuring holistic care under one roof.
              </p>
            </div>

            <div className="mt-8">
              <PrimaryButton to="/about/leaders" size="lg">
                Meet Our Leaders
              </PrimaryButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <GradientCard gradient="soft" className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-2xl bg-brand-coral/10 text-brand-coral mr-4">
                  <FaAward className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-brand-ink">NABH Accredited</h3>
                  <p className="text-brand-muted text-sm">Quality healthcare standards</p>
                </div>
              </div>
              <p className="text-brand-muted text-sm">
                National Accreditation Board for Hospitals & Healthcare Providers certification
                ensures we meet the highest quality and safety standards.
              </p>
            </GradientCard>

            <GradientCard gradient="teal" className="p-6 text-white">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-2xl bg-white/20 mr-4">
                  <FaGraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">FOGSI Training Centre</h3>
                  <p className="text-white/90 text-sm">Certified for gynecologist training</p>
                </div>
              </div>
              <p className="text-white/90 text-sm">
                Federation of Obstetric and Gynaecological Societies of India has certified
                us as an official training centre for medical professionals.
              </p>
            </GradientCard>
          </motion.div>
        </div>
      </Section>

      {/* Our Values */}
      <Section background="white" padding="lg">
        <SectionHeader
          title="Our Core Values"
          description="The principles that guide every aspect of our care and define our commitment to patients."
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((value, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GradientCard gradient="soft" className="h-full p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-2xl bg-brand-tealSoft text-brand-teal">
                    {value.icon}
                  </div>
                </div>
                <h3 className="font-heading font-bold text-lg text-brand-ink mb-3">
                  {value.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed">
                  {value.description}
                </p>
              </GradientCard>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Numbers That Matter */}
      <Section background="gradient" padding="lg">
        <SectionHeader
          title="Shashwat in Numbers"
          description="Our impact measured through the lives we've touched and the excellence we've achieved."
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <motion.div variants={itemVariants}>
            <MetricCard
              value={clinicInfo.metrics.yearsExperience}
              label="Years of Excellence"
              description="Serving families since 1997"
              icon={<FaAward className="w-6 h-6" />}
              color="teal"
              animated={false}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <MetricCard
              value={clinicInfo.metrics.townsReached}
              label="Towns Reached"
              description="Across Gujarat & Rajasthan"
              icon={<FaGlobe className="w-6 h-6" />}
              color="coral"
              animated={false}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <MetricCard
              value={clinicInfo.metrics.livesImpacted}
              label="Lives Impacted"
              description="Through our outreach programs"
              icon={<FaHeart className="w-6 h-6" />}
              color="lavender"
              animated={false}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <MetricCard
              value={clinicInfo.metrics.successRate}
              label="IVF Success Rate"
              description="Above national average"
              icon={<FaGraduationCap className="w-6 h-6" />}
              color="ink"
              animated={false}
            />
          </motion.div>
        </motion.div>
      </Section>

      {/* Timeline */}
      <Section background="white" padding="lg">
        <SectionHeader
          title="Our Journey of Excellence"
          description="Key milestones that have shaped our growth and commitment to healthcare excellence."
          className="mb-16"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <GradientCard gradient="soft" className="p-6">
                    <div className="text-2xl font-bold text-brand-teal mb-2">
                      {item.year}
                    </div>
                    <h3 className="font-heading font-bold text-lg text-brand-ink mb-2">
                      {item.event}
                    </h3>
                    <p className="text-brand-muted text-sm">
                      {item.description}
                    </p>
                  </GradientCard>
                </div>

                <div className="flex-shrink-0">
                  <div className="w-4 h-4 bg-brand-teal rounded-full border-4 border-white shadow-lg" />
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>
    </>
  );
};

export default AboutPage;

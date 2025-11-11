import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaUserMd, FaUserNurse, FaUsers, FaCog, FaHeart } from 'react-icons/fa';
import Section from '../components/common/Section';
import SectionHeader from '../components/common/SectionHeader';
import GradientCard from '../components/common/GradientCard';
import Pill from '../components/common/Pill';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useTeamMembers } from '../hooks/useApi';
import { teamMembers } from '../data/doctors';

const TeamPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const { data: apiTeamMembers, loading, error } = useTeamMembers();
  
  // Fallback to mock data if API fails
  const displayTeamMembers = apiTeamMembers?.length > 0 ? apiTeamMembers : teamMembers;

  const categories = [
    { name: 'All', icon: <FaUsers className="w-4 h-4" />, count: displayTeamMembers.length },
    { name: 'Doctor', icon: <FaUserMd className="w-4 h-4" />, count: displayTeamMembers.filter(m => m.category === 'Doctor').length },
    { name: 'Nurse', icon: <FaUserNurse className="w-4 h-4" />, count: displayTeamMembers.filter(m => m.category === 'Nurse').length },
    { name: 'Technician', icon: <FaCog className="w-4 h-4" />, count: displayTeamMembers.filter(m => m.category === 'Technician').length },
    { name: 'Administrative', icon: <FaUsers className="w-4 h-4" />, count: displayTeamMembers.filter(m => m.category === 'Administrative').length },
    { name: 'Support Staff', icon: <FaHeart className="w-4 h-4" />, count: displayTeamMembers.filter(m => m.category === 'Support Staff').length }
  ];

  const filteredMembers = activeFilter === 'All' 
    ? displayTeamMembers 
    : displayTeamMembers.filter(member => member.category === activeFilter);

  const getCategoryColor = (category) => {
    const colors = {
      'Doctor': 'teal',
      'Nurse': 'coral',
      'Technician': 'lavender',
      'Administrative': 'default',
      'Support Staff': 'success'
    };
    return colors[category] || 'default';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Doctor': <FaUserMd className="w-4 h-4" />,
      'Nurse': <FaUserNurse className="w-4 h-4" />,
      'Technician': <FaCog className="w-4 h-4" />,
      'Administrative': <FaUsers className="w-4 h-4" />,
      'Support Staff': <FaHeart className="w-4 h-4" />
    };
    return icons[category] || <FaUsers className="w-4 h-4" />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Our Team - Dedicated Healthcare Professionals | Shashwat IVF & Women's Hospital</title>
          <meta name="description" content="Loading our team..." />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="xl" />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Our Team - Dedicated Healthcare Professionals | Shashwat IVF & Women's Hospital</title>
        <meta 
          name="description" 
          content="Meet our dedicated team of healthcare professionals including doctors, nurses, embryologists, and support staff committed to providing exceptional fertility care." 
        />
        <meta name="keywords" content="medical team, fertility specialists, nurses, embryologists, healthcare staff ahmedabad" />
      </Helmet>

      {/* Hero Section */}
      <Section background="gradient" padding="xl">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Pill variant="white" className="mb-6">Our Dedicated Team</Pill>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-brand-ink mb-6">
              Caring Hands, Expert Minds
            </h1>
            <p className="text-xl md:text-2xl text-brand-muted leading-relaxed">
              Behind every successful treatment is a team of dedicated professionals who bring 
              expertise, compassion, and unwavering commitment to patient care.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Team Stats */}
      <Section background="white" padding="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-teal mb-2">15+</div>
            <div className="text-brand-muted text-sm">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-coral mb-2">100+</div>
            <div className="text-brand-muted text-sm">Years Combined Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-lavender mb-2">24/7</div>
            <div className="text-brand-muted text-sm">Patient Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-ink mb-2">5+</div>
            <div className="text-brand-muted text-sm">Specializations</div>
          </div>
        </motion.div>
      </Section>

      {/* Filter Categories */}
      <Section background="white" padding="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveFilter(category.name)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeFilter === category.name
                  ? 'bg-brand-teal text-white shadow-lg'
                  : 'bg-white text-brand-muted hover:bg-brand-tealSoft hover:text-brand-teal border border-brand-tealSoft'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeFilter === category.name
                  ? 'bg-white/20 text-white'
                  : 'bg-brand-tealSoft text-brand-teal'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </motion.div>
      </Section>

      {/* Team Members Grid */}
      <Section padding="lg">
        <motion.div
          key={activeFilter} // Re-animate when filter changes
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredMembers.map((member, index) => (
            <motion.div key={member.id} variants={itemVariants}>
              <GradientCard gradient="soft" className="h-full p-6 text-center hover:shadow-card-hover transition-all duration-300">
                {/* Avatar */}
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-brand-teal to-brand-lavender text-white flex items-center justify-center text-xl font-bold mb-4 shadow-lg relative overflow-hidden">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`absolute inset-0 bg-gradient-to-br from-brand-teal/80 to-brand-lavender/80 flex items-center justify-center ${member.image ? 'hidden' : ''}`}>
                    <span className="text-white font-bold text-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="font-heading font-bold text-lg text-brand-ink mb-2">
                  {member.name}
                </h3>
                <p className="text-brand-muted font-medium mb-3">
                  {member.role}
                </p>

                {/* Category Badge */}
                <div className="mb-4">
                  <Pill 
                    variant={getCategoryColor(member.category)} 
                    size="sm"
                    className="flex items-center justify-center space-x-1"
                  >
                    {getCategoryIcon(member.category)}
                    <span>{member.category}</span>
                  </Pill>
                </div>

                {/* Experience */}
                <div className="mb-4">
                  <div className="text-2xl font-bold text-brand-teal mb-1">
                    {member.experience}
                  </div>
                  <div className="text-xs text-brand-muted">Experience</div>
                </div>

                {/* Description */}
                <p className="text-brand-muted text-sm leading-relaxed">
                  {member.description}
                </p>

                {/* Hover Effect */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-full h-1 bg-brand-tealSoft rounded-full overflow-hidden">
                    <div className="h-full bg-brand-teal rounded-full w-3/4" />
                  </div>
                </div>
              </GradientCard>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredMembers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-heading font-bold text-xl text-brand-ink mb-2">
              No team members found
            </h3>
            <p className="text-brand-muted">
              Try selecting a different category to see our team members.
            </p>
          </motion.div>
        )}
      </Section>

      {/* Team Culture */}
      <Section background="gradient" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-ink mb-6">
              Our Team Culture
            </h2>
            <p className="text-lg text-brand-muted leading-relaxed mb-8">
              We foster an environment of continuous learning, mutual respect, and shared commitment 
              to patient care. Every team member, regardless of their role, plays a crucial part in 
              our mission to help families achieve their dreams.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GradientCard gradient="soft" className="p-6">
                <FaHeart className="w-8 h-8 text-brand-coral mx-auto mb-4" />
                <h3 className="font-bold text-brand-ink mb-2">Compassionate Care</h3>
                <p className="text-brand-muted text-sm">Every interaction is guided by empathy and understanding</p>
              </GradientCard>
              
              <GradientCard gradient="soft" className="p-6">
                <FaUsers className="w-8 h-8 text-brand-teal mx-auto mb-4" />
                <h3 className="font-bold text-brand-ink mb-2">Collaborative Spirit</h3>
                <p className="text-brand-muted text-sm">Working together as one unified team for patient success</p>
              </GradientCard>
              
              <GradientCard gradient="soft" className="p-6">
                <FaCog className="w-8 h-8 text-brand-lavender mx-auto mb-4" />
                <h3 className="font-bold text-brand-ink mb-2">Excellence Driven</h3>
                <p className="text-brand-muted text-sm">Committed to the highest standards in everything we do</p>
              </GradientCard>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default TeamPage;

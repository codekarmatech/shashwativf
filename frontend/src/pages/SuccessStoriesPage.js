import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaHeart, FaQuoteLeft, FaFilter, FaBaby } from 'react-icons/fa';
import Section from '../components/common/Section';
import SectionHeader from '../components/common/SectionHeader';
import GradientCard from '../components/common/GradientCard';
import Pill from '../components/common/Pill';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useSuccessStories } from '../hooks/useApi';
import { successStories, storyCategories } from '../data/stories';

const SuccessStoriesPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { data: apiSuccessStories, loading, error } = useSuccessStories();
  
  // Fallback to mock data if API fails or returns empty
  const displayStories = apiSuccessStories?.length > 0 ? apiSuccessStories : successStories;

  const filteredStories = activeCategory === 'All' 
    ? displayStories 
    : displayStories.filter(story => story.category === activeCategory);

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Success Stories - Loading... | Shashwat IVF</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="xl" />
        </div>
      </>
    );
  }

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

  return (
    <>
      <Helmet>
        <title>Success Stories - Real Families, Real Joy | Shashwat IVF & Women's Hospital</title>
        <meta 
          name="description" 
          content="Read inspiring success stories from families who achieved their dreams of parenthood through our fertility treatments. Real journeys, real hope, real miracles." 
        />
        <meta name="keywords" content="IVF success stories, fertility success, patient testimonials, pregnancy success, fertility journey" />
      </Helmet>

      {/* Hero Section */}
      <Section background="gradient" padding="xl">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Pill variant="white" className="mb-6">Success Stories</Pill>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-brand-ink mb-6">
              Stories of Hope, Joy & Miracles
            </h1>
            <p className="text-xl md:text-2xl text-brand-muted leading-relaxed">
              Every family has a unique journey. Here are the inspiring stories of couples 
              who found their way to parenthood with our support and care.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Stats Overview */}
      <Section background="white" padding="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-teal mb-2">500+</div>
            <div className="text-brand-muted text-sm">Happy Families</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-coral mb-2">65%</div>
            <div className="text-brand-muted text-sm">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-lavender mb-2">20+</div>
            <div className="text-brand-muted text-sm">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-ink mb-2">91+</div>
            <div className="text-brand-muted text-sm">Towns Reached</div>
          </div>
        </motion.div>
      </Section>

      {/* Category Filters */}
      <Section background="white" padding="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {storyCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-brand-teal text-white shadow-lg'
                  : 'bg-white text-brand-muted hover:bg-brand-tealSoft hover:text-brand-teal border border-brand-tealSoft'
              }`}
            >
              <FaFilter className="w-4 h-4" />
              <span>{category}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeCategory === category
                  ? 'bg-white/20 text-white'
                  : 'bg-brand-tealSoft text-brand-teal'
              }`}>
                {category === 'All' ? successStories.length : successStories.filter(s => s.category === category).length}
              </span>
            </button>
          ))}
        </motion.div>
      </Section>

      {/* Success Stories Grid */}
      <Section padding="lg">
        <motion.div
          key={activeCategory} // Re-animate when filter changes
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredStories.map((story, index) => (
            <motion.div key={story.id} variants={itemVariants}>
              <GradientCard gradient="soft" className="h-full p-6 hover:shadow-card-hover transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-teal to-brand-lavender rounded-full flex items-center justify-center text-white font-bold">
                      {story.patientInitials}
                    </div>
                    <div>
                      <div className="font-bold text-brand-ink">{story.patientInitials}</div>
                      <div className="text-brand-muted text-sm">Age {story.age}</div>
                    </div>
                  </div>
                  <Pill variant="teal" size="sm">
                    {story.year}
                  </Pill>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-lg text-brand-ink mb-4">
                  {story.title}
                </h3>

                {/* Treatment Info */}
                <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-xl">
                  <div>
                    <div className="text-brand-teal font-semibold text-sm">{story.treatment}</div>
                    <div className="text-brand-muted text-xs">{story.duration}</div>
                  </div>
                  <Pill variant="success" size="sm">
                    <FaBaby className="w-3 h-3 mr-1" />
                    Success
                  </Pill>
                </div>

                {/* Quote */}
                <div className="mb-6">
                  <FaQuoteLeft className="w-5 h-5 text-brand-coral mb-3" />
                  <blockquote className="text-brand-ink font-medium italic leading-relaxed">
                    "{story.quote}"
                  </blockquote>
                </div>

                {/* Story */}
                <div className="mb-6">
                  <h4 className="font-semibold text-brand-ink text-sm mb-2">Journey</h4>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    {story.story}
                  </p>
                </div>

                {/* Outcome */}
                <div className="flex items-center justify-between pt-4 border-t border-brand-tealSoft/30">
                  <div>
                    <div className="text-brand-ink font-semibold text-sm">{story.outcome}</div>
                    <div className="text-brand-muted text-xs">Final Result</div>
                  </div>
                  <Pill variant="coral" size="sm">
                    {story.category}
                  </Pill>
                </div>
              </GradientCard>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredStories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">💝</div>
            <h3 className="font-heading font-bold text-xl text-brand-ink mb-2">
              No stories found in this category
            </h3>
            <p className="text-brand-muted mb-6">
              Try selecting a different category to see more inspiring stories.
            </p>
            <button
              onClick={() => setActiveCategory('All')}
              className="px-6 py-3 bg-brand-teal text-white rounded-full font-medium hover:bg-brand-teal/90 transition-colors"
            >
              View All Stories
            </button>
          </motion.div>
        )}
      </Section>

      {/* Testimonial Highlight */}
      <Section background="gradient" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <FaHeart className="w-16 h-16 text-brand-coral mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-heading font-bold text-brand-ink mb-6 leading-relaxed">
              "Every couple deserves the joy of parenthood. Our role is to guide them with 
              ethical, transparent care throughout their fertility journey."
            </blockquote>
            <div className="text-brand-muted">
              <div className="font-semibold">Dr. Shital Punjabi</div>
              <div className="text-sm">Lead Fertility Specialist</div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Share Your Story CTA */}
      <Section background="white" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-ink mb-6">
              Share Your Story
            </h2>
            <p className="text-lg text-brand-muted leading-relaxed mb-8">
              Have you achieved your dream of parenthood with our help? We'd love to hear 
              your story and inspire other couples on their fertility journey.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GradientCard gradient="soft" className="p-6">
                <FaHeart className="w-8 h-8 text-brand-coral mx-auto mb-4" />
                <h3 className="font-bold text-brand-ink mb-2">Inspire Others</h3>
                <p className="text-brand-muted text-sm">Your story can give hope to couples facing similar challenges</p>
              </GradientCard>
              
              <GradientCard gradient="soft" className="p-6">
                <FaBaby className="w-8 h-8 text-brand-teal mx-auto mb-4" />
                <h3 className="font-bold text-brand-ink mb-2">Celebrate Success</h3>
                <p className="text-brand-muted text-sm">Help us celebrate the miracle of life and new beginnings</p>
              </GradientCard>
              
              <GradientCard gradient="soft" className="p-6">
                <FaQuoteLeft className="w-8 h-8 text-brand-lavender mx-auto mb-4" />
                <h3 className="font-bold text-brand-ink mb-2">Privacy Respected</h3>
                <p className="text-brand-muted text-sm">We maintain complete confidentiality and respect your privacy</p>
              </GradientCard>
            </div>

            <div className="mt-8">
              <button className="px-8 py-4 bg-brand-coral text-white rounded-full font-medium hover:bg-brand-coral/90 transition-colors shadow-lg hover:shadow-xl">
                Share Your Success Story
              </button>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default SuccessStoriesPage;

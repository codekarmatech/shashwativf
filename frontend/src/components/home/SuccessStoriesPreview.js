import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import GradientCard from '../common/GradientCard';
import Pill from '../common/Pill';
import SectionHeader from '../common/SectionHeader';
import { PrimaryButton } from '../common/Button';
import { successStories } from '../../data/stories';

const SuccessStoriesPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredStories = successStories.slice(0, 4);

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredStories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredStories.length) % featuredStories.length);
  };

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
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Stories of Hope & Joy"
          description="Real families, real journeys, real miracles. Discover how we've helped couples achieve their dreams of parenthood."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Featured Story Carousel */}
          <div className="relative">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative overflow-hidden"
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {featuredStories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    variants={itemVariants}
                    className="w-full flex-shrink-0"
                  >
                    <GradientCard gradient="soft" className="p-8">
                      <div className="flex items-start mb-6">
                        <div className="p-3 rounded-full bg-brand-coral/10 text-brand-coral mr-4">
                          <FaQuoteLeft className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-heading font-bold text-xl text-brand-ink">
                              {story.patientInitials}
                            </h3>
                            <Pill variant="teal" size="sm">
                              Age {story.age}
                            </Pill>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-brand-muted">
                            <span>{story.treatment}</span>
                            <span>•</span>
                            <span>{story.duration}</span>
                            <span>•</span>
                            <span>{story.year}</span>
                          </div>
                        </div>
                      </div>

                      <blockquote className="text-lg text-brand-ink font-medium italic mb-6 leading-relaxed">
                        "{story.quote}"
                      </blockquote>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-brand-ink text-sm mb-1">Journey</h4>
                          <p className="text-brand-muted text-sm">{story.story}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <Pill variant="success" size="sm">
                            {story.outcome}
                          </Pill>
                          <Pill variant="coral" size="sm">
                            {story.category}
                          </Pill>
                        </div>
                      </div>
                    </GradientCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prevStory}
                className="p-3 rounded-full bg-brand-tealSoft text-brand-teal hover:bg-brand-teal hover:text-white transition-colors duration-200"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex space-x-2">
                {featuredStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentIndex ? 'bg-brand-teal' : 'bg-brand-tealSoft'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextStory}
                className="p-3 rounded-full bg-brand-tealSoft text-brand-teal hover:bg-brand-teal hover:text-white transition-colors duration-200"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Statistics & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-heading font-bold text-3xl text-brand-ink mb-6">
                Every Story Matters
              </h3>
              <p className="text-lg text-brand-muted mb-8 leading-relaxed">
                Behind every statistic is a family's journey to parenthood. Our success 
                is measured not just in numbers, but in the joy and hope we help create.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-6 bg-gradient-to-br from-brand-tealSoft to-white rounded-2xl">
                <div className="text-3xl font-bold text-brand-teal mb-2">65%</div>
                <div className="text-sm text-brand-muted">IVF Success Rate</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-brand-coral/10 to-white rounded-2xl">
                <div className="text-3xl font-bold text-brand-coral mb-2">500+</div>
                <div className="text-sm text-brand-muted">Happy Families</div>
              </div>
            </div>

            {/* Treatment Categories */}
            <div>
              <h4 className="font-semibold text-brand-ink mb-4">Success Across Treatments</h4>
              <div className="space-y-2">
                {['IVF & ICSI', 'Egg Freezing', 'IUI', 'Male Factor Treatment'].map((treatment, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-brand-muted text-sm">{treatment}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-brand-tealSoft rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-teal rounded-full"
                          style={{ width: `${85 - index * 10}%` }}
                        />
                      </div>
                      <span className="text-xs text-brand-muted w-8">{85 - index * 10}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <PrimaryButton size="lg" to="/stories" className="w-full">
              Read All Success Stories
            </PrimaryButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesPreview;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaClock, FaUser, FaArrowRight } from 'react-icons/fa';
import GradientCard from '../common/GradientCard';
import Pill from '../common/Pill';
import SectionHeader from '../common/SectionHeader';
import { GhostButton } from '../common/Button';
import { useBlogPosts } from '../../hooks/useApi';
import { normalizeBlogPosts, buildCategoryList } from '../../utils/content';

const BlogPreview = () => {
  const { data: apiBlogPosts } = useBlogPosts();
  const posts = normalizeBlogPosts(apiBlogPosts || []);
  const featuredPosts = posts.filter(post => post.featured).slice(0, 2);
  const recentPosts = posts.filter(post => !post.featured).slice(0, 1);
  const displayPosts = [...featuredPosts, ...recentPosts];
  const previewCategories = buildCategoryList(posts).filter((category) => category !== 'All').slice(0, 5);

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

  const getCategoryColor = (category) => {
    const colors = {
      'Egg Freezing': 'lavender',
      'IVF Basics': 'teal',
      'Male Factor': 'coral',
      'IVF Journey': 'default',
      'Women\'s Health': 'success',
      'Support & Wellness': 'info'
    };
    return colors[category] || 'default';
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-bg via-white to-brand-tealSoft/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Insights & Knowledge"
          description="Stay informed with the latest in fertility treatments, women's health, and expert guidance from our medical team."
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayPosts.map((post, index) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Link to={`/blog/${post.slug}`}>
                <GradientCard 
                  gradient="soft" 
                  className={`h-full p-6 hover:shadow-card-hover transition-all duration-300 ${
                    post.featured ? 'lg:row-span-2' : ''
                  }`}
                >
                  {/* Featured Badge */}
                  {post.featured && (
                    <div className="mb-4">
                      <Pill variant="coral" size="sm">Featured</Pill>
                    </div>
                  )}

                  {/* Category */}
                  <div className="mb-4">
                    <Pill variant={getCategoryColor(post.category)} size="sm">
                      {post.category}
                    </Pill>
                  </div>

                  {/* Title */}
                  <h3 className={`font-heading font-bold text-brand-ink mb-4 line-clamp-3 ${
                    post.featured ? 'text-xl md:text-2xl' : 'text-lg'
                  }`}>
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className={`text-brand-muted mb-6 line-clamp-3 ${
                    post.featured ? 'text-base' : 'text-sm'
                  }`}>
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-brand-muted mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <FaUser className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaClock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {post.featured && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="text-xs px-2 py-1 bg-white/50 text-brand-muted rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Read More */}
                  <div className="flex items-center text-brand-teal font-medium text-sm group">
                    <span>Read Article</span>
                    <FaArrowRight className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </div>

                  {/* Publish Date */}
                  <div className="mt-4 pt-4 border-t border-brand-tealSoft/30">
                    <span className="text-xs text-brand-muted">
                      {new Date(post.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </GradientCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Categories & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="mb-8">
            <h4 className="font-semibold text-brand-ink mb-4">Explore Topics</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {previewCategories.map((category, index) => (
                <Link
                  key={index}
                  to={`/blog?category=${encodeURIComponent(category)}`}
                  className="text-sm px-4 py-2 bg-white text-brand-muted hover:text-brand-teal hover:bg-brand-tealSoft rounded-full transition-colors duration-200 shadow-sm"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <GhostButton size="lg" to="/blog">
            View All Articles
          </GhostButton>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaClock, FaUser, FaArrowRight, FaTag } from 'react-icons/fa';
import Section from '../components/common/Section';
import SectionHeader from '../components/common/SectionHeader';
import GradientCard from '../components/common/GradientCard';
import Pill from '../components/common/Pill';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PageError from '../components/common/PageError';
import { useBlogPosts } from '../hooks/useApi';
import { blogPosts, blogCategories } from '../data/blog';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: apiBlogPosts, loading, error } = useBlogPosts();
  
  // Fallback to mock data if API fails or returns empty
  const displayPosts = apiBlogPosts?.length > 0 ? apiBlogPosts : blogPosts;

  const filteredPosts = displayPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Blog - Loading... | Shashwat IVF</title>
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
          <title>Error - Blog | Shashwat IVF</title>
        </Helmet>
        <PageError 
          message="We couldn't load the articles. Please check your connection." 
          onRetry={() => window.location.reload()} 
        />
      </>
    );
  }

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
        <title>Blog - Fertility Insights & Expert Guidance | Shashwat IVF & Women's Hospital</title>
        <meta 
          name="description" 
          content="Stay informed with expert insights on fertility treatments, women's health, and reproductive medicine from our medical team at Shashwat IVF." 
        />
        <meta name="keywords" content="fertility blog, IVF insights, women's health articles, reproductive medicine, fertility tips" />
      </Helmet>

      {/* Hero Section */}
      <Section background="gradient" padding="xl">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Pill variant="white" className="mb-6">Knowledge & Insights</Pill>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-brand-ink mb-6">
              Expert Guidance for Your Journey
            </h1>
            <p className="text-xl md:text-2xl text-brand-muted leading-relaxed">
              Stay informed with the latest insights on fertility treatments, women's health, 
              and expert guidance from our medical team to support your journey.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Search & Filter */}
      <Section background="white" padding="sm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-brand-tealSoft rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-brand-ink placeholder-brand-muted"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {blogCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-brand-teal text-white shadow-lg'
                      : 'bg-white text-brand-muted hover:bg-brand-tealSoft hover:text-brand-teal border border-brand-tealSoft'
                  }`}
                >
                  {category}
                  <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                    activeCategory === category
                      ? 'bg-white/20 text-white'
                      : 'bg-brand-tealSoft text-brand-teal'
                  }`}>
                    {category === 'All' ? blogPosts.length : blogPosts.filter(p => p.category === category).length}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <Section padding="lg">
          <SectionHeader
            title="Featured Articles"
            description="Our most popular and insightful articles on fertility and women's health."
            className="mb-12"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          >
            {featuredPosts.slice(0, 2).map((post, index) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Link to={`/blog/${post.slug}`}>
                  <GradientCard gradient="soft" className="h-full p-8 hover:shadow-card-hover transition-all duration-300">
                    {/* Featured Image */}
                    {post.featured_image && (
                      <div className="mb-6 -mx-8 -mt-8">
                        <img 
                          src={post.featured_image} 
                          alt={post.title}
                          className="w-full h-56 object-cover"
                        />
                      </div>
                    )}

                    {/* Featured Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <Pill variant="coral" size="sm">Featured</Pill>
                      <Pill variant={getCategoryColor(post.category)} size="sm">
                        {post.category}
                      </Pill>
                    </div>

                    {/* Title */}
                    <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-ink mb-4 line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-brand-muted mb-6 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-brand-muted mb-6">
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
                      <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="text-xs px-3 py-1 bg-white text-brand-muted rounded-full border border-brand-tealSoft"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <div className="flex items-center text-brand-teal font-medium group">
                      <span>Read Full Article</span>
                      <FaArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </GradientCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Section>
      )}

      {/* All Posts */}
      <Section padding="lg">
        <SectionHeader
          title={activeCategory === 'All' ? 'All Articles' : `${activeCategory} Articles`}
          description="Explore our comprehensive collection of articles on fertility and women's health."
          className="mb-12"
        />

        <motion.div
          key={`${activeCategory}-${searchTerm}`} // Re-animate when filters change
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {regularPosts.map((post, index) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Link to={`/blog/${post.slug}`}>
                <GradientCard gradient="soft" className="h-full p-6 hover:shadow-card-hover transition-all duration-300">
                  {/* Featured Image */}
                  {post.featured_image && (
                    <div className="mb-4 -mx-6 -mt-6">
                      <img 
                        src={post.featured_image} 
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}

                  {/* Category */}
                  <div className="mb-4">
                    <Pill variant={getCategoryColor(post.category)} size="sm">
                      {post.category}
                    </Pill>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-lg text-brand-ink mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-brand-muted text-sm mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-brand-muted mb-4">
                    <div className="flex items-center space-x-3">
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
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-xs px-2 py-1 bg-white text-brand-muted rounded-full"
                      >
                        <FaTag className="w-2 h-2 inline mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Date & Read More */}
                  <div className="flex items-center justify-between pt-4 border-t border-brand-tealSoft/30">
                    <span className="text-xs text-brand-muted">
                      {new Date(post.publishDate).toLocaleDateString()}
                    </span>
                    <div className="flex items-center text-brand-teal font-medium text-sm group">
                      <span>Read More</span>
                      <FaArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </GradientCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="font-heading font-bold text-xl text-brand-ink mb-2">
              No articles found
            </h3>
            <p className="text-brand-muted mb-6">
              Try adjusting your search terms or category filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('All');
              }}
              className="px-6 py-3 bg-brand-teal text-white rounded-full font-medium hover:bg-brand-teal/90 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </Section>

      {/* Newsletter Signup */}
      <Section background="gradient" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-ink mb-6">
              Stay Updated
            </h2>
            <p className="text-lg text-brand-muted leading-relaxed mb-8">
              Subscribe to our newsletter to receive the latest articles, fertility tips, 
              and expert insights directly in your inbox.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-brand-tealSoft rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                />
                <button className="px-6 py-3 bg-brand-coral text-white rounded-xl font-medium hover:bg-brand-coral/90 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-brand-muted text-sm mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default BlogPage;

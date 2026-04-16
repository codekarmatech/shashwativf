import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaClock, FaUser, FaTag, FaShare, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import Section from '../components/common/Section';
import GradientCard from '../components/common/GradientCard';
import Pill from '../components/common/Pill';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PageError from '../components/common/PageError';
import { PrimaryButton } from '../components/common/Button';
import { useBlogPost, useBlogPosts } from '../hooks/useApi';
import { normalizeBlogPost, normalizeBlogPosts } from '../utils/content';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { data: apiPost, loading, error } = useBlogPost(slug);
  const { data: apiBlogPosts } = useBlogPosts();
  
  const post = normalizeBlogPost(apiPost);
  const allPosts = normalizeBlogPosts(apiBlogPosts || []);

  if (loading) {
    return (
      <Section padding="xl">
        <div className="flex justify-center">
          <LoadingSpinner size="xl" />
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <PageError 
        message="We encountered an issue while loading this article." 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  if (!post) {
    return (
      <Section padding="xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-ink mb-4">Article Not Found</h1>
          <p className="text-brand-muted mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-brand-teal hover:text-brand-ink">
            ← Back to Blog
          </Link>
        </div>
      </Section>
    );
  }

  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const shareUrl = `${window.location.origin}/blog/${post.slug}`;
  const shareTitle = post.title;

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <FaFacebook className="w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'bg-blue-600'
    },
    {
      name: 'Twitter',
      icon: <FaTwitter className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      color: 'bg-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin className="w-5 h-5" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'bg-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="w-5 h-5" />,
      url: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`,
      color: 'bg-green-500'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{post.title} - Shashwat IVF Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta name="author" content={post.author} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={shareUrl} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
      </Helmet>

      {/* Article Header */}
      <Section background="gradient" padding="md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <div className="mb-4">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-white/80 hover:text-white transition-colors font-medium"
              >
                <FaArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </div>

            {/* Category & Featured Badge */}
            <div className="flex items-center space-x-3 mb-4">
              <Pill variant="white">{post.category}</Pill>
              {post.featured && <Pill variant="coral">Featured</Pill>}
            </div>

            {/* Title */}
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-white/90 leading-relaxed mb-6">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center space-x-2">
                <FaUser className="w-4 h-4" />
                <span>By {post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaClock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Published: {new Date(post.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Featured Image */}
      {post.featuredImage && (
        <Section padding="sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-2xl shadow-2xl"
            >
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-48 md:h-64 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>
          </div>
        </Section>
      )}

      {/* Article Content */}
      <Section padding="lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <GradientCard gradient="soft" className="p-8">
                  {/* Article Body */}
                  <div className="prose prose-lg max-w-none text-brand-muted">
                    {post.content ? (
                      <p className="mb-6 whitespace-pre-line">{post.content}</p>
                    ) : (
                      <div className="bg-brand-tealSoft/20 rounded-2xl p-6 my-4">
                        <h3 className="font-bold text-brand-ink mb-2">Content Not Available</h3>
                        <p>The full article content has not been published yet.</p>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t border-brand-tealSoft/30">
                    <h4 className="font-semibold text-brand-ink mb-4">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Link
                          key={index}
                          to={`/blog?tag=${encodeURIComponent(tag)}`}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-white text-brand-muted hover:text-brand-teal hover:bg-brand-tealSoft rounded-full text-sm border border-brand-tealSoft transition-colors"
                        >
                          <FaTag className="w-3 h-3" />
                          <span>{tag}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </GradientCard>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Share Article */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <GradientCard gradient="soft" className="p-6">
                  <h3 className="font-heading font-bold text-lg text-brand-ink mb-4 flex items-center">
                    <FaShare className="w-4 h-4 mr-2" />
                    Share Article
                  </h3>
                  <div className="space-y-3">
                    {shareLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-3 p-3 ${link.color} text-white rounded-xl hover:opacity-90 transition-opacity`}
                      >
                        {link.icon}
                        <span className="font-medium">{link.name}</span>
                      </a>
                    ))}
                  </div>
                </GradientCard>
              </motion.div>

              {/* Author Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <GradientCard gradient="teal" className="p-6 text-white">
                  <h3 className="font-heading font-bold text-lg mb-4">About the Author</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold">{post.author}</div>
                      <div className="text-white/80 text-sm">Medical Expert</div>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm">
                    {post.author === 'Dr. Shital Punjabi' 
                      ? 'Lead Fertility Specialist with 30+ years of experience in reproductive medicine. Gold in D.G.O. + M.D. and FICOG certified.'
                      : 'Medical professional at Shashwat IVF & Women\'s Hospital, dedicated to providing expert guidance on fertility and women\'s health.'
                    }
                  </p>
                </GradientCard>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <GradientCard gradient="coral" className="p-6 text-white text-center">
                  <h3 className="font-heading font-bold text-lg mb-4">
                    Need Expert Guidance?
                  </h3>
                  <p className="text-white/90 text-sm mb-6">
                    Schedule a consultation with our fertility specialists to discuss your options.
                  </p>
                  <PrimaryButton 
                    to="/contact" 
                    className="bg-white text-brand-coral hover:bg-white/90 w-full"
                  >
                    Book Consultation
                  </PrimaryButton>
                </GradientCard>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <Section background="white" padding="lg">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading font-bold text-3xl text-brand-ink mb-8 text-center">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                    <GradientCard gradient="soft" className="p-6 hover:shadow-card-hover transition-all duration-300 h-full">
                      <div className="mb-4">
                        <Pill variant="default" size="sm">{relatedPost.category}</Pill>
                      </div>
                      <h3 className="font-heading font-bold text-lg text-brand-ink mb-3 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-brand-muted text-sm mb-4 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-brand-muted">
                        <span>{relatedPost.author}</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </GradientCard>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </Section>
      )}
    </>
  );
};

export default BlogDetailPage;

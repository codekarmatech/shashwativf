import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaPlay, FaImage, FaNewspaper, FaVideo, FaTh, FaColumns } from 'react-icons/fa';
import Section from '../components/common/Section';
import GradientCard from '../components/common/GradientCard';
import Pill from '../components/common/Pill';
import { Tab } from '@headlessui/react';
import MediaCollage from '../components/media/MediaCollage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useMediaData } from '../hooks/useApi';
import { mediaData } from '../data/media';

const MediaPage = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [layout, setLayout] = useState('collage');
  
  const { data: backendData, loading, error } = useMediaData();
  
  // Fallback to mock data if API fails
  const displayData = {
    videos: backendData.videos?.length > 0 ? backendData.videos : mediaData.videos || [],
    photos: backendData.photos?.length > 0 ? backendData.photos : mediaData.photos || [],
    academic: backendData.academic?.length > 0 ? backendData.academic : mediaData.academicExcellence || [],
    missions: backendData.missions?.length > 0 ? backendData.missions : mediaData.globalMissions || [],
    press: backendData.press?.length > 0 ? backendData.press : mediaData.pressReleases || []
  };

  const tabCategories = [
    { name: 'All Media', icon: <FaVideo className="w-4 h-4" />, key: 'all' },
    { name: 'Videos', icon: <FaPlay className="w-4 h-4" />, key: 'videos' },
    { name: 'Photos', icon: <FaImage className="w-4 h-4" />, key: 'photos' },
    { name: 'Academic Excellence', icon: <FaNewspaper className="w-4 h-4" />, key: 'academic' },
    { name: 'Global Missions', icon: <FaNewspaper className="w-4 h-4" />, key: 'missions' },
    { name: 'Press Coverage', icon: <FaNewspaper className="w-4 h-4" />, key: 'press' }
  ];

  const layoutOptions = [
    { name: 'Collage', icon: <FaTh className="w-4 h-4" />, key: 'collage' },
    { name: 'Grid', icon: <FaTh className="w-4 h-4" />, key: 'grid' },
    { name: 'Masonry', icon: <FaColumns className="w-4 h-4" />, key: 'masonry' }
  ];

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

  const VideoModal = ({ video, onClose }) => {
    if (!video) return null;
    
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-bold text-brand-ink">{video.title}</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              className="w-full h-full"
              allowFullScreen
              title={video.title}
            />
          </div>
          <div className="p-4">
            <p className="text-brand-muted text-sm">{video.description}</p>
          </div>
        </div>
      </div>
    );
  };


  if (loading) {
    return (
      <>
        <Helmet>
          <title>Media Coverage - Videos, Photos & Press | Shashwat IVF & Women's Hospital</title>
          <meta name="description" content="Loading media content..." />
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
        <title>Media Coverage - Videos, Photos & Press | Shashwat IVF & Women's Hospital</title>
        <meta 
          name="description" 
          content="Explore our media coverage including YouTube videos, photo galleries, press coverage, and news articles about Shashwat IVF & Women's Hospital." 
        />
        <meta name="keywords" content="shashwat ivf media, videos, photos, press coverage, news articles, youtube videos" />
      </Helmet>

      {/* Hero Section */}
      <Section background="gradient" padding="xl">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Pill variant="white" className="mb-6">Media Coverage</Pill>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-brand-ink mb-6">
              In the Spotlight
            </h1>
            <p className="text-xl md:text-2xl text-brand-muted leading-relaxed">
              Discover our journey through videos, photos, and press coverage showcasing 
              our commitment to excellence in fertility care and women's health.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Media Stats */}
      <Section background="white" padding="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-teal mb-2">{displayData.videos.length}+</div>
            <div className="text-brand-muted text-sm">Video Features</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-coral mb-2">{displayData.photos.length}+</div>
            <div className="text-brand-muted text-sm">Photo Gallery</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-lavender mb-2">{displayData.press.length}+</div>
            <div className="text-brand-muted text-sm">Press Articles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-ink mb-2">50K+</div>
            <div className="text-brand-muted text-sm">Media Reach</div>
          </div>
        </motion.div>
      </Section>

      {/* Media Content */}
      <Section padding="lg">
        <div className="max-w-7xl mx-auto">
          <Tab.Group>
            <Tab.List className="flex flex-wrap justify-center gap-4 mb-12">
              {tabCategories.map((category) => (
                <Tab
                  key={category.key}
                  className={({ selected }) =>
                    `flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                      selected
                        ? 'bg-brand-teal text-white shadow-lg'
                        : 'bg-white text-brand-muted hover:bg-brand-tealSoft hover:text-brand-teal border border-brand-tealSoft'
                    }`
                  }
                >
                  {category.icon}
                  <span>{category.name}</span>
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels>
              {/* All Media */}
              <Tab.Panel>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-12"
                >
                  {/* Featured Videos */}
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-brand-ink mb-6">Featured Videos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {displayData.videos.slice(0, 3).map((video, index) => (
                        <motion.div key={video.id} variants={itemVariants}>
                          <GradientCard gradient="soft" className="overflow-hidden hover:shadow-card-hover transition-all duration-300">
                            <div 
                              className="relative aspect-video bg-gray-200 cursor-pointer group"
                              onClick={() => setSelectedVideo(video)}
                            >
                              <img 
                                src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                                alt={video.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-all duration-300">
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                                  <FaPlay className="w-6 h-6 text-brand-teal ml-1" />
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="font-bold text-brand-ink mb-2">{video.title}</h3>
                              <p className="text-brand-muted text-sm mb-3">{video.description}</p>
                              <div className="flex items-center justify-between">
                                <Pill variant="teal" size="sm">{video.category}</Pill>
                                <span className="text-xs text-brand-muted">{video.date}</span>
                              </div>
                            </div>
                          </GradientCard>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Photo Gallery */}
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-brand-ink mb-6">Photo Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {displayData.photos.slice(0, 8).map((photo, index) => (
                        <motion.div key={photo.id} variants={itemVariants}>
                          <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden group relative">
                            <img 
                              src={photo.thumbnail || photo.url}
                              alt={photo.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                            <div className="absolute bottom-2 left-2 right-2">
                              <Pill variant="white" size="sm" className="text-xs truncate">
                                {photo.title}
                              </Pill>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Press Coverage */}
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-brand-ink mb-6">Press Coverage</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {displayData.press.slice(0, 4).map((article, index) => (
                        <motion.div key={article.id} variants={itemVariants}>
                          <GradientCard gradient="soft" className="p-6 hover:shadow-card-hover transition-all duration-300">
                            <div className="flex items-start space-x-4">
                              <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                                <img 
                                  src={article.image}
                                  alt={article.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-brand-ink mb-2">{article.title}</h3>
                                <p className="text-brand-muted text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                                <div className="flex items-center justify-between">
                                  <Pill variant="coral" size="sm">{article.publication}</Pill>
                                  <span className="text-xs text-brand-muted">{article.date}</span>
                                </div>
                              </div>
                            </div>
                          </GradientCard>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Tab.Panel>

              {/* Videos Only */}
              <Tab.Panel>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {displayData.videos.map((video, index) => (
                    <motion.div key={video.id} variants={itemVariants}>
                      <GradientCard gradient="soft" className="overflow-hidden hover:shadow-card-hover transition-all duration-300">
                        <div 
                          className="relative aspect-video bg-gray-200 cursor-pointer group"
                          onClick={() => setSelectedVideo(video)}
                        >
                          <img 
                            src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-all duration-300">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                              <FaPlay className="w-6 h-6 text-brand-teal ml-1" />
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-brand-ink mb-2">{video.title}</h3>
                          <p className="text-brand-muted text-sm mb-3">{video.description}</p>
                          <div className="flex items-center justify-between">
                            <Pill variant="teal" size="sm">{video.category}</Pill>
                            <span className="text-xs text-brand-muted">{video.date}</span>
                          </div>
                        </div>
                      </GradientCard>
                    </motion.div>
                  ))}
                </motion.div>
              </Tab.Panel>

              {/* Photos Only */}
              <Tab.Panel>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {displayData.photos.map((photo, index) => (
                    <motion.div key={photo.id} variants={itemVariants}>
                      <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden group relative">
                        <img 
                          src={photo.thumbnail || photo.url}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <Pill variant="white" size="sm" className="text-xs truncate">
                            {photo.title}
                          </Pill>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </Tab.Panel>

              {/* Academic Excellence Only */}
              <Tab.Panel>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                  {/* Dr. Shital's Gold Medal Highlight */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-8 border border-yellow-200">
                    <div className="text-center mb-8">
                      <h2 className="font-heading font-bold text-3xl text-brand-ink mb-4">
                        🏆 Dr. Shital Punjabi's Academic Excellence
                      </h2>
                      <p className="text-lg text-brand-muted">
                        Celebrating outstanding achievements in medical education and professional excellence
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {displayData.academic.filter(item => item.featured).map((achievement, index) => (
                        <GradientCard key={achievement.id} gradient="soft" className="p-6 text-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🏆</span>
                          </div>
                          <h3 className="font-bold text-brand-ink mb-2">{achievement.title}</h3>
                          <p className="text-brand-muted text-sm mb-3">{achievement.description}</p>
                          {achievement.highlight && (
                            <Pill variant="coral" size="sm">{achievement.highlight}</Pill>
                          )}
                        </GradientCard>
                      ))}
                    </div>
                  </div>

                  {/* All Academic Achievements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayData.academic.map((achievement, index) => (
                      <motion.div key={achievement.id} variants={itemVariants}>
                        <GradientCard gradient="soft" className="p-6 hover:shadow-card-hover transition-all duration-300">
                          <div className="flex items-start space-x-4">
                            <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                              <img 
                                src={achievement.image}
                                alt={achievement.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-brand-ink mb-2">{achievement.title}</h3>
                              <p className="text-brand-muted text-sm mb-3">{achievement.description}</p>
                              <div className="flex items-center justify-between mb-3">
                                <Pill variant="teal" size="sm">{achievement.category}</Pill>
                                <span className="text-xs text-brand-muted">{achievement.date}</span>
                              </div>
                              {achievement.location && (
                                <p className="text-xs text-brand-muted">📍 {achievement.location}</p>
                              )}
                            </div>
                          </div>
                        </GradientCard>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </Tab.Panel>

              {/* Global Missions Only */}
              <Tab.Panel>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                  {/* Global Impact Highlight */}
                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 border border-blue-200">
                    <div className="text-center mb-8">
                      <h2 className="font-heading font-bold text-3xl text-brand-ink mb-4">
                        🌍 Global Healthcare Missions
                      </h2>
                      <p className="text-lg text-brand-muted">
                        Extending compassionate care beyond borders - Tanzania, Madagascar & International Faculty
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {displayData.missions.filter(mission => mission.featured).map((mission, index) => (
                        <GradientCard key={mission.id} gradient="teal" className="p-6 text-white">
                          <h3 className="font-bold text-xl mb-3">{mission.title}</h3>
                          <p className="text-white/90 text-sm mb-4">{mission.description}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">📍 Location:</span>
                              <span className="text-white/90">{mission.location}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">👥 Beneficiaries:</span>
                              <span className="text-white/90">{mission.beneficiaries}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">💫 Impact:</span>
                              <span className="text-white/90">{mission.impact}</span>
                            </div>
                          </div>
                        </GradientCard>
                      ))}
                    </div>
                  </div>

                  {/* All Global Missions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayData.missions.map((mission, index) => (
                      <motion.div key={mission.id} variants={itemVariants}>
                        <GradientCard gradient="soft" className="p-6 hover:shadow-card-hover transition-all duration-300">
                          <div className="flex items-start space-x-4">
                            <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                              <img 
                                src={mission.image}
                                alt={mission.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-brand-ink mb-2">{mission.title}</h3>
                              <p className="text-brand-muted text-sm mb-3">{mission.description}</p>
                              <div className="flex items-center justify-between mb-3">
                                <Pill variant="lavender" size="sm">{mission.category}</Pill>
                                <span className="text-xs text-brand-muted">{mission.date}</span>
                              </div>
                              <div className="text-xs text-brand-muted space-y-1">
                                <p>📍 {mission.location}</p>
                                {mission.impact && <p>💫 {mission.impact}</p>}
                              </div>
                            </div>
                          </div>
                        </GradientCard>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </Tab.Panel>

              {/* Press Coverage Only */}
              <Tab.Panel>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {displayData.press.map((article, index) => (
                    <motion.div key={article.id} variants={itemVariants}>
                      <GradientCard gradient="soft" className="p-6 hover:shadow-card-hover transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                            <img 
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-brand-ink mb-2">{article.title}</h3>
                            <p className="text-brand-muted text-sm mb-3">{article.description}</p>
                            <div className="flex items-center justify-between mb-3">
                              <Pill variant="coral" size="sm">{article.outlet}</Pill>
                              <span className="text-xs text-brand-muted">{article.date}</span>
                            </div>
                            <button className="text-brand-teal hover:text-brand-ink text-sm font-medium">
                              Read Full Article →
                            </button>
                          </div>
                        </div>
                      </GradientCard>
                    </motion.div>
                  ))}
                </motion.div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </Section>

      {/* Video Modal */}
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </>
  );
};

export default MediaPage;

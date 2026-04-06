import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaPlay, FaImage, FaNewspaper, FaVideo } from 'react-icons/fa';
import Section from '../components/common/Section';
import GradientCard from '../components/common/GradientCard';
import Pill from '../components/common/Pill';
import { Tab } from '@headlessui/react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useMediaData } from '../hooks/useApi';

const ComingSoon = ({ section }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center py-16 px-8"
  >
    <div className="w-20 h-20 bg-gradient-to-br from-brand-teal/20 to-brand-coral/20 rounded-full flex items-center justify-center mx-auto mb-6">
      <span className="text-3xl">🎬</span>
    </div>
    <h3 className="font-heading font-bold text-2xl text-brand-ink mb-3">Coming Soon</h3>
    <p className="text-brand-muted max-w-md mx-auto">
      We're working on bringing you amazing {section} content. Stay tuned!
    </p>
  </motion.div>
);

const MediaPage = () => {
  const [playingVideoId, setPlayingVideoId] = useState(null);
  
  const { data: backendData, loading } = useMediaData();
  
  // Use backend data only — no mock fallback (Media and Academic sections)
  const displayData = {
    videos: backendData.videos || [],
    photos: backendData.photos || [],
    academic: backendData.academic || [],
    missions: backendData.missions || [],
    press: backendData.press || []
  };

  const tabCategories = [
    { name: 'All Media', icon: <FaVideo className="w-4 h-4" />, key: 'all' },
    { name: 'Videos', icon: <FaPlay className="w-4 h-4" />, key: 'videos' },
    { name: 'Photos', icon: <FaImage className="w-4 h-4" />, key: 'photos' },
    { name: 'Academic Excellence', icon: <FaNewspaper className="w-4 h-4" />, key: 'academic' },
    { name: 'Global Missions', icon: <FaNewspaper className="w-4 h-4" />, key: 'missions' },
    { name: 'Press Coverage', icon: <FaNewspaper className="w-4 h-4" />, key: 'press' }
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

  // Inline video player component
  const VideoCard = ({ video }) => {
    const isPlaying = playingVideoId === video.id;
    const youtubeId = video.youtube_id;
    const videoFile = video.video_file;

    return (
      <GradientCard gradient="soft" className="overflow-hidden hover:shadow-card-hover transition-all duration-300">
        <div className="relative aspect-video bg-gray-900">
          {isPlaying ? (
            // Playing state - show embedded video
            youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media"
                title={video.title}
              />
            ) : videoFile ? (
              <video
                src={videoFile}
                className="w-full h-full"
                controls
                autoPlay
                title={video.title}
              />
            ) : null
          ) : (
            // Thumbnail state - click to play
            <div
              className="w-full h-full cursor-pointer group"
              onClick={() => setPlayingVideoId(video.id)}
            >
              {youtubeId ? (
                <img
                  src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <FaVideo className="w-12 h-12 text-gray-500" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-all duration-300">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaPlay className="w-6 h-6 text-brand-teal ml-1" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-brand-ink mb-2">{video.title}</h3>
          <p className="text-brand-muted text-sm mb-3 line-clamp-2">{video.description}</p>
          <div className="flex items-center justify-between">
            <Pill variant="teal" size="sm">{video.category_name || 'Uncategorized'}</Pill>
            <span className="text-xs text-brand-muted">{video.date}</span>
          </div>
        </div>
      </GradientCard>
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
            <div className="text-3xl font-bold text-brand-teal mb-2">{displayData.videos.length || 0}</div>
            <div className="text-brand-muted text-sm">Video Features</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-coral mb-2">{displayData.photos.length || 0}</div>
            <div className="text-brand-muted text-sm">Photo Gallery</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-lavender mb-2">{displayData.press.length || 0}</div>
            <div className="text-brand-muted text-sm">Press Articles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-ink mb-2">{displayData.academic.length || 0}</div>
            <div className="text-brand-muted text-sm">Academic Achievements</div>
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
                    {displayData.videos.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayData.videos.slice(0, 3).map((video) => (
                          <motion.div key={video.id} variants={itemVariants}>
                            <VideoCard video={video} />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <ComingSoon section="video" />
                    )}
                  </div>

                  {/* Photo Gallery */}
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-brand-ink mb-6">Photo Gallery</h2>
                    {displayData.photos.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {displayData.photos.slice(0, 8).map((photo) => (
                          <motion.div key={photo.id} variants={itemVariants}>
                            <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden group relative">
                              <img 
                                src={photo.thumbnail || photo.image}
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
                    ) : (
                      <ComingSoon section="photo" />
                    )}
                  </div>

                  {/* Press Coverage */}
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-brand-ink mb-6">Press Coverage</h2>
                    {displayData.press.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {displayData.press.slice(0, 4).map((article) => (
                          <motion.div key={article.id} variants={itemVariants}>
                            <GradientCard gradient="soft" className="p-6 hover:shadow-card-hover transition-all duration-300">
                              <div className="flex items-start space-x-4">
                                {article.image && (
                                  <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                                    <img 
                                      src={article.image}
                                      alt={article.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <h3 className="font-bold text-brand-ink mb-2">{article.title}</h3>
                                  <p className="text-brand-muted text-sm mb-3 line-clamp-2">{article.description}</p>
                                  <div className="flex items-center justify-between">
                                    <Pill variant="coral" size="sm">{article.outlet}</Pill>
                                    <span className="text-xs text-brand-muted">{article.date}</span>
                                  </div>
                                </div>
                              </div>
                            </GradientCard>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <ComingSoon section="press coverage" />
                    )}
                  </div>
                </motion.div>
              </Tab.Panel>

              {/* Videos Only */}
              <Tab.Panel>
                {displayData.videos.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {displayData.videos.map((video) => (
                      <motion.div key={video.id} variants={itemVariants}>
                        <VideoCard video={video} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <ComingSoon section="video" />
                )}
              </Tab.Panel>

              {/* Photos Only */}
              <Tab.Panel>
                {displayData.photos.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  >
                    {displayData.photos.map((photo) => (
                      <motion.div key={photo.id} variants={itemVariants}>
                        <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden group relative">
                          <img 
                            src={photo.thumbnail || photo.image}
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
                ) : (
                  <ComingSoon section="photo" />
                )}
              </Tab.Panel>

              {/* Academic Excellence Only */}
              <Tab.Panel>
                {displayData.academic.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                  >
                    {/* Featured Achievements */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-8 border border-yellow-200">
                      <div className="text-center mb-8">
                        <h2 className="font-heading font-bold text-3xl text-brand-ink mb-4">
                          🏆 Academic Excellence
                        </h2>
                        <p className="text-lg text-brand-muted">
                          Celebrating outstanding achievements in medical education and professional excellence
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {displayData.academic.filter(item => item.featured).map((achievement) => (
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

                    {/* All Achievements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {displayData.academic.map((achievement) => (
                        <motion.div key={achievement.id} variants={itemVariants}>
                          <GradientCard gradient="soft" className="p-6 hover:shadow-card-hover transition-all duration-300">
                            <div className="flex items-start space-x-4">
                              {achievement.image && (
                                <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                                  <img 
                                    src={achievement.image}
                                    alt={achievement.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <h3 className="font-bold text-brand-ink mb-2">{achievement.title}</h3>
                                <p className="text-brand-muted text-sm mb-3">{achievement.description}</p>
                                <div className="flex items-center justify-between mb-3">
                                  <Pill variant="teal" size="sm">{achievement.category_name || 'Achievement'}</Pill>
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
                ) : (
                  <ComingSoon section="academic excellence" />
                )}
              </Tab.Panel>

              {/* Global Missions Only */}
              <Tab.Panel>
                {displayData.missions.length > 0 ? (
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
                          Extending compassionate care beyond borders
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {displayData.missions.filter(mission => mission.featured).map((mission) => (
                          <GradientCard key={mission.id} gradient="teal" className="p-6 text-white">
                            <h3 className="font-bold text-xl mb-3">{mission.title}</h3>
                            <p className="text-white/90 text-sm mb-4">{mission.description}</p>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <span className="font-semibold mr-2">📍 Location:</span>
                                <span className="text-white/90">{mission.location}</span>
                              </div>
                              {mission.beneficiaries && (
                                <div className="flex items-center">
                                  <span className="font-semibold mr-2">👥 Beneficiaries:</span>
                                  <span className="text-white/90">{mission.beneficiaries}</span>
                                </div>
                              )}
                              {mission.impact && (
                                <div className="flex items-center">
                                  <span className="font-semibold mr-2">💫 Impact:</span>
                                  <span className="text-white/90">{mission.impact}</span>
                                </div>
                              )}
                            </div>
                          </GradientCard>
                        ))}
                      </div>
                    </div>

                    {/* All Global Missions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {displayData.missions.map((mission) => (
                        <motion.div key={mission.id} variants={itemVariants}>
                          <GradientCard gradient="soft" className="p-6 hover:shadow-card-hover transition-all duration-300">
                            <div className="flex items-start space-x-4">
                              {mission.image && (
                                <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                                  <img 
                                    src={mission.image}
                                    alt={mission.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <h3 className="font-bold text-brand-ink mb-2">{mission.title}</h3>
                                <p className="text-brand-muted text-sm mb-3">{mission.description}</p>
                                <div className="flex items-center justify-between mb-3">
                                  <Pill variant="lavender" size="sm">{mission.category_name || 'Mission'}</Pill>
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
                ) : (
                  <ComingSoon section="global mission" />
                )}
              </Tab.Panel>

              {/* Press Coverage Only */}
              <Tab.Panel>
                {displayData.press.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {displayData.press.map((article) => (
                      <motion.div key={article.id} variants={itemVariants}>
                        <GradientCard gradient="soft" className="p-6 hover:shadow-card-hover transition-all duration-300">
                          <div className="flex items-start space-x-4">
                            {article.image && (
                              <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                                <img 
                                  src={article.image}
                                  alt={article.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="font-bold text-brand-ink mb-2">{article.title}</h3>
                              <p className="text-brand-muted text-sm mb-3">{article.description}</p>
                              <div className="flex items-center justify-between mb-3">
                                <Pill variant="coral" size="sm">{article.outlet}</Pill>
                                <span className="text-xs text-brand-muted">{article.date}</span>
                              </div>
                              {article.external_url && (
                                <a 
                                  href={article.external_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-brand-teal hover:text-brand-ink text-sm font-medium"
                                >
                                  Read Full Article →
                                </a>
                              )}
                            </div>
                          </div>
                        </GradientCard>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <ComingSoon section="press coverage" />
                )}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </Section>
    </>
  );
};

export default MediaPage;

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaPlay, FaImage, FaNewspaper, FaVideo } from 'react-icons/fa';
import { Tab } from '@headlessui/react';
import Section from '../components/common/Section';
import GradientCard from '../components/common/GradientCard';
import Pill from '../components/common/Pill';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useMediaData } from '../hooks/useApi';
import {
  getPhotoSizing,
  getVideoEmbedUrl,
  getVideoSizing,
  getVideoThumbnailUrl,
  resolveMediaUrl,
} from '../utils/media';

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

const VideoCard = ({ video, isPlaying, onPlay }) => {
  const { cardStyle, frameStyle } = getVideoSizing(video);
  const embedUrl = getVideoEmbedUrl(video);
  const thumbnailUrl = getVideoThumbnailUrl(video);
  const videoFileUrl = resolveMediaUrl(video.video_file_url || video.video_file);
  const categoryLabel = video.category_label || video.category_name || 'Uncategorized';

  return (
    <div className="w-full" style={cardStyle}>
      <GradientCard gradient="soft" className="overflow-hidden hover:shadow-card-hover transition-all duration-300">
        <div className="relative bg-gray-900" style={frameStyle}>
          {isPlaying ? (
            embedUrl ? (
              <iframe
                src={`${embedUrl}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            ) : videoFileUrl ? (
              <video
                src={videoFileUrl}
                className="w-full h-full"
                controls
                autoPlay
                title={video.title}
              />
            ) : null
          ) : (
            <button
              type="button"
              className="relative w-full h-full cursor-pointer group text-left"
              onClick={onPlay}
            >
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover"
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
            </button>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-brand-ink mb-2">{video.title}</h3>
          <p className="text-brand-muted text-sm mb-3 line-clamp-2">{video.description}</p>
          <div className="flex items-center justify-between gap-3">
            <Pill variant="teal" size="sm">{categoryLabel}</Pill>
            <span className="text-xs text-brand-muted whitespace-nowrap">{video.date}</span>
          </div>
        </div>
      </GradientCard>
    </div>
  );
};

const PhotoCard = ({ photo }) => {
  const cardStyle = getPhotoSizing(photo);
  const thumbnailUrl = resolveMediaUrl(photo.thumbnail_url || photo.thumbnail);
  const imageUrl = resolveMediaUrl(photo.image_url || photo.image);
  const sourceUrl = thumbnailUrl || imageUrl;

  return (
    <div className="w-full" style={cardStyle}>
      <div className="relative w-full h-full bg-gray-200 overflow-hidden group" style={{ borderRadius: cardStyle.borderRadius }}>
        {sourceUrl ? (
          <img
            src={sourceUrl}
            alt={photo.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(event) => {
              if (imageUrl && event.currentTarget.src !== imageUrl) {
                event.currentTarget.src = imageUrl;
              }
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <FaImage className="w-10 h-10 text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        <div className="absolute bottom-2 left-2 right-2">
          <Pill variant="white" size="sm" className="text-xs truncate">
            {photo.title}
          </Pill>
        </div>
      </div>
    </div>
  );
};

const MediaPage = () => {
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const { data: backendData, loading } = useMediaData();

  const displayData = {
    videos: backendData.videos || [],
    photos: backendData.photos || [],
    academic: backendData.academic || [],
    missions: backendData.missions || [],
    press: backendData.press || [],
  };

  const tabCategories = [
    { name: 'All Media', icon: <FaVideo className="w-4 h-4" />, key: 'all' },
    { name: 'Videos', icon: <FaPlay className="w-4 h-4" />, key: 'videos' },
    { name: 'Photos', icon: <FaImage className="w-4 h-4" />, key: 'photos' },
    { name: 'Academic Excellence', icon: <FaNewspaper className="w-4 h-4" />, key: 'academic' },
    { name: 'Global Missions', icon: <FaNewspaper className="w-4 h-4" />, key: 'missions' },
    { name: 'Press Coverage', icon: <FaNewspaper className="w-4 h-4" />, key: 'press' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
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

      <Section padding="lg">
        <div className="max-w-7xl mx-auto">
          <Tab.Group>
            <Tab.List className="flex flex-wrap justify-center gap-4 mb-12">
              {tabCategories.map((category) => (
                <Tab
                  key={category.key}
                  className={({ selected }) =>
                    `flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${selected
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
              <Tab.Panel>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-12"
                >
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-brand-ink mb-6">Featured Videos</h2>
                    {displayData.videos.length > 0 ? (
                      <div className="flex flex-wrap justify-center gap-6">
                        {displayData.videos.slice(0, 3).map((video) => (
                          <motion.div key={video.id} variants={itemVariants} className="w-full flex justify-center">
                            <VideoCard
                              video={video}
                              isPlaying={playingVideoId === video.id}
                              onPlay={() => setPlayingVideoId(video.id)}
                            />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <ComingSoon section="video" />
                    )}
                  </div>

                  <div>
                    <h2 className="font-heading font-bold text-2xl text-brand-ink mb-6">Photo Gallery</h2>
                    {displayData.photos.length > 0 ? (
                      <div className="flex flex-wrap justify-center gap-4">
                        {displayData.photos.slice(0, 8).map((photo) => (
                          <motion.div key={photo.id} variants={itemVariants} className="w-full flex justify-center">
                            <PhotoCard photo={photo} />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <ComingSoon section="photo" />
                    )}
                  </div>

                  <div>
                    <h2 className="font-heading font-bold text-2xl text-brand-ink mb-6">Press Coverage</h2>
                    {displayData.press.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {displayData.press.slice(0, 4).map((article) => {
                          const imageUrl = resolveMediaUrl(article.image_url || article.image);

                          return (
                            <motion.div key={article.id} variants={itemVariants}>
                              <GradientCard gradient="soft" className="p-6 hover:shadow-card-hover transition-all duration-300">
                                <div className="flex items-start space-x-4">
                                  {imageUrl && (
                                    <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                                      <img
                                        src={imageUrl}
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <h3 className="font-bold text-brand-ink mb-2">{article.title}</h3>
                                    <p className="text-brand-muted text-sm mb-3 line-clamp-2">{article.description}</p>
                                    <div className="flex items-center justify-between gap-3">
                                      <Pill variant="coral" size="sm">{article.outlet}</Pill>
                                      <span className="text-xs text-brand-muted whitespace-nowrap">{article.date}</span>
                                    </div>
                                    {article.external_url && (
                                      <a
                                        href={article.external_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-3 text-sm font-medium text-brand-teal hover:text-brand-ink"
                                      >
                                        Read Full Article →
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </GradientCard>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <ComingSoon section="press coverage" />
                    )}
                  </div>
                </motion.div>
              </Tab.Panel>

              <Tab.Panel>
                {displayData.videos.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap justify-center gap-6"
                  >
                    {displayData.videos.map((video) => (
                      <motion.div key={video.id} variants={itemVariants} className="w-full flex justify-center">
                        <VideoCard
                          video={video}
                          isPlaying={playingVideoId === video.id}
                          onPlay={() => setPlayingVideoId(video.id)}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <ComingSoon section="video" />
                )}
              </Tab.Panel>

              <Tab.Panel>
                {displayData.photos.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap justify-center gap-4"
                  >
                    {displayData.photos.map((photo) => (
                      <motion.div key={photo.id} variants={itemVariants} className="w-full flex justify-center">
                        <PhotoCard photo={photo} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <ComingSoon section="photo" />
                )}
              </Tab.Panel>

              <Tab.Panel>
                {displayData.academic.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                  >
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
                        {displayData.academic.filter((item) => item.featured).map((achievement) => (
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {displayData.academic.map((achievement) => {
                        const imageUrl = resolveMediaUrl(achievement.image_url || achievement.image);

                        return (
                          <motion.div key={achievement.id} variants={itemVariants}>
                            <GradientCard gradient="soft" className="p-6 hover:shadow-card-hover transition-all duration-300">
                              <div className="flex items-start space-x-4">
                                {imageUrl && (
                                  <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                                    <img
                                      src={imageUrl}
                                      alt={achievement.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <h3 className="font-bold text-brand-ink mb-2">{achievement.title}</h3>
                                  <p className="text-brand-muted text-sm mb-3">{achievement.description}</p>
                                  <div className="flex items-center justify-between mb-3 gap-3">
                                    <Pill variant="teal" size="sm">
                                      {achievement.category_label || achievement.category_name || 'Achievement'}
                                    </Pill>
                                    <span className="text-xs text-brand-muted whitespace-nowrap">{achievement.date}</span>
                                  </div>
                                  {achievement.location && (
                                    <p className="text-xs text-brand-muted">📍 {achievement.location}</p>
                                  )}
                                </div>
                              </div>
                            </GradientCard>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <ComingSoon section="academic excellence" />
                )}
              </Tab.Panel>

              <Tab.Panel>
                {displayData.missions.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                  >
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
                        {displayData.missions.filter((mission) => mission.featured).map((mission) => (
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {displayData.missions.map((mission) => {
                        const imageUrl = resolveMediaUrl(mission.image_url || mission.image);

                        return (
                          <motion.div key={mission.id} variants={itemVariants}>
                            <GradientCard gradient="soft" className="p-6 hover:shadow-card-hover transition-all duration-300">
                              <div className="flex items-start space-x-4">
                                {imageUrl && (
                                  <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                                    <img
                                      src={imageUrl}
                                      alt={mission.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <h3 className="font-bold text-brand-ink mb-2">{mission.title}</h3>
                                  <p className="text-brand-muted text-sm mb-3">{mission.description}</p>
                                  <div className="flex items-center justify-between mb-3 gap-3">
                                    <Pill variant="lavender" size="sm">
                                      {mission.category_label || mission.category_name || 'Mission'}
                                    </Pill>
                                    <span className="text-xs text-brand-muted whitespace-nowrap">{mission.date}</span>
                                  </div>
                                  <div className="text-xs text-brand-muted space-y-1">
                                    <p>📍 {mission.location}</p>
                                    {mission.impact && <p>💫 {mission.impact}</p>}
                                  </div>
                                </div>
                              </div>
                            </GradientCard>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <ComingSoon section="global missions" />
                )}
              </Tab.Panel>

              <Tab.Panel>
                {displayData.press.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {displayData.press.map((article) => {
                      const imageUrl = resolveMediaUrl(article.image_url || article.image);

                      return (
                        <motion.div key={article.id} variants={itemVariants}>
                          <GradientCard gradient="soft" className="p-6 hover:shadow-card-hover transition-all duration-300">
                            <div className="flex items-start space-x-4">
                              {imageUrl && (
                                <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                                  <img
                                    src={imageUrl}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <h3 className="font-bold text-brand-ink mb-2">{article.title}</h3>
                                <p className="text-brand-muted text-sm mb-3">{article.description}</p>
                                <div className="flex items-center justify-between mb-3 gap-3">
                                  <Pill variant="coral" size="sm">{article.outlet}</Pill>
                                  <span className="text-xs text-brand-muted whitespace-nowrap">{article.date}</span>
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
                      );
                    })}
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

import React from 'react';
import { motion } from 'framer-motion';
import DynamicMediaItem from './DynamicMediaItem';

const MediaCollage = ({ photos = [], videos = [], layout = 'masonry' }) => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  if (layout === 'grid') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-min"
      >
        {photos.map((photo, index) => (
          <motion.div key={`photo-${photo.id}`} variants={itemVariants}>
            <DynamicMediaItem item={photo} type="photo" />
          </motion.div>
        ))}
        {videos.map((video, index) => (
          <motion.div key={`video-${video.id}`} variants={itemVariants}>
            <DynamicMediaItem item={video} type="video" />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (layout === 'collage') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-6 auto-rows-min gap-4"
        style={{ gridAutoRows: 'minmax(200px, auto)' }}
      >
        {photos.map((photo, index) => (
          <motion.div key={`photo-${photo.id}`} variants={itemVariants}>
            <DynamicMediaItem item={photo} type="photo" />
          </motion.div>
        ))}
        {videos.map((video, index) => (
          <motion.div key={`video-${video.id}`} variants={itemVariants}>
            <DynamicMediaItem item={video} type="video" />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Masonry layout (default)
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
    >
      {photos.map((photo, index) => (
        <motion.div 
          key={`photo-${photo.id}`} 
          variants={itemVariants}
          className="break-inside-avoid mb-4"
        >
          <DynamicMediaItem item={photo} type="photo" />
        </motion.div>
      ))}
      {videos.map((video, index) => (
        <motion.div 
          key={`video-${video.id}`} 
          variants={itemVariants}
          className="break-inside-avoid mb-4"
        >
          <DynamicMediaItem item={video} type="video" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MediaCollage;

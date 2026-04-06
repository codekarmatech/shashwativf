import React from 'react';
import { motion } from 'framer-motion';
import {
  getPhotoSizing,
  getVideoEmbedUrl,
  getVideoSizing,
  resolveMediaUrl,
} from '../../utils/media';

const DynamicMediaItem = ({ item, type = 'photo' }) => {
  // Get size configuration from backend
  const getSizeClasses = () => {
    if (type === 'photo') {
      return getPhotoSizing(item);
    }
    
    if (type === 'video') {
      return getVideoSizing(item);
    }
  };
  
  // Get grid span classes for collage layout
  const getGridSpanClasses = () => {
    if (type !== 'photo' || !item.collage_position) return '';
    
    const spanMap = {
      '1x1': 'col-span-1 row-span-1',
      '2x1': 'col-span-2 row-span-1',
      '1x2': 'col-span-1 row-span-2',
      '2x2': 'col-span-2 row-span-2',
      '3x1': 'col-span-3 row-span-1',
      '1x3': 'col-span-1 row-span-3',
    };
    
    return spanMap[item.collage_position] || 'col-span-1 row-span-1';
  };
  
  const sizeStyles = getSizeClasses();
  const gridClasses = getGridSpanClasses();
  
  if (type === 'photo') {
    const imageUrl = resolveMediaUrl(item.thumbnail_url || item.image_url || item.thumbnail || item.image || item.url);

    return (
      <motion.div
        className={`relative overflow-hidden ${gridClasses}`}
        style={sizeStyles}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={imageUrl}
          alt={item.title}
          className="w-full h-full object-cover"
          style={{ borderRadius: sizeStyles.borderRadius }}
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300" />
        <div className="absolute bottom-2 left-2 right-2">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
            <p className="text-xs font-medium text-gray-800 truncate">
              {item.title}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }
  
  if (type === 'video') {
    const { cardStyle, frameStyle } = sizeStyles;
    const embedUrl = getVideoEmbedUrl(item);

    return (
      <motion.div
        className="relative overflow-hidden rounded-xl"
        style={cardStyle}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <iframe
          src={embedUrl}
          title={item.title}
          className="w-full h-full"
          style={frameStyle}
          frameBorder="0"
          allowFullScreen
        />
        <div className="absolute bottom-2 left-2 right-2">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
            <p className="text-xs font-medium text-white truncate">
              {item.title}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return null;
};

export default DynamicMediaItem;

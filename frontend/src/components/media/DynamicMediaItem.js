import React from 'react';
import { motion } from 'framer-motion';

const DynamicMediaItem = ({ item, type = 'photo' }) => {
  // Get size configuration from backend
  const getSizeClasses = () => {
    if (type === 'photo') {
      const { display_size, collage_position, width_pixels, height_pixels, border_radius } = item;
      
      // Use custom dimensions if provided, otherwise use preset sizes
      if (width_pixels && height_pixels) {
        return {
          width: `${width_pixels}px`,
          height: `${height_pixels}px`,
          borderRadius: `${border_radius || 12}px`
        };
      }
      
      // Preset size classes
      const sizeMap = {
        'thumbnail': { width: '150px', height: '150px' },
        'small': { width: '250px', height: '200px' },
        'medium': { width: '400px', height: '300px' },
        'large': { width: '600px', height: '450px' },
        'extra_large': { width: '800px', height: '600px' },
        'full_width': { width: '100%', height: 'auto' },
        'square_small': { width: '200px', height: '200px' },
        'square_medium': { width: '300px', height: '300px' },
        'square_large': { width: '500px', height: '500px' },
      };
      
      return {
        ...sizeMap[display_size] || sizeMap.medium,
        borderRadius: `${border_radius || 12}px`
      };
    }
    
    if (type === 'video') {
      const { display_size, width_percentage, height_pixels } = item;
      
      // Use custom dimensions if provided
      if (width_percentage && height_pixels) {
        return {
          width: `${width_percentage}%`,
          height: `${height_pixels}px`
        };
      }
      
      // Preset video size classes
      const sizeMap = {
        'small': { width: '300px', height: '200px' },
        'medium': { width: '400px', height: '300px' },
        'large': { width: '600px', height: '400px' },
        'extra_large': { width: '800px', height: '500px' },
        'full_width': { width: '100%', height: '400px' },
      };
      
      return sizeMap[display_size] || sizeMap.medium;
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
    return (
      <motion.div
        className={`relative overflow-hidden ${gridClasses}`}
        style={sizeStyles}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={item.thumbnail || item.image || item.url}
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
    return (
      <motion.div
        className="relative overflow-hidden rounded-xl"
        style={sizeStyles}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${item.youtube_id}`}
          title={item.title}
          className="w-full h-full"
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

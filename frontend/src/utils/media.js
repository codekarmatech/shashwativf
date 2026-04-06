const API_BASE_URL = process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://api.shashwativf.com/api'
    : 'http://localhost:8000/api');

const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');
const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]{11}$/;

export const resolveMediaUrl = (value) => {
  if (!value) {
    return null;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const normalizedPath = value.startsWith('/') ? value : `/${value}`;
  return `${API_ORIGIN}${normalizedPath}`;
};

export const extractYouTubeVideoId = (value) => {
  if (!value) {
    return null;
  }

  const candidate = String(value).trim();
  if (!candidate) {
    return null;
  }

  try {
    const parsed = new URL(candidate);
    const host = parsed.hostname.toLowerCase();
    const segments = parsed.pathname.split('/').filter(Boolean);

    if (host === 'youtu.be' || host === 'www.youtu.be') {
      return YOUTUBE_ID_RE.test(segments[0] || '') ? segments[0] : null;
    }

    if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
      if (parsed.pathname === '/watch') {
        const videoId = parsed.searchParams.get('v');
        return YOUTUBE_ID_RE.test(videoId || '') ? videoId : null;
      }

      if (segments.length >= 2 && ['embed', 'shorts', 'live', 'v'].includes(segments[0])) {
        return YOUTUBE_ID_RE.test(segments[1]) ? segments[1] : null;
      }
    }
  } catch (error) {
    return YOUTUBE_ID_RE.test(candidate) ? candidate : null;
  }

  return YOUTUBE_ID_RE.test(candidate) ? candidate : null;
};

export const getVideoEmbedUrl = (video) => {
  if (video?.youtube_embed_url) {
    return video.youtube_embed_url;
  }

  const videoId = extractYouTubeVideoId(video?.youtube_video_id || video?.youtube_id);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

export const getVideoThumbnailUrl = (video) => {
  if (video?.youtube_thumbnail_url) {
    return video.youtube_thumbnail_url;
  }

  const videoId = extractYouTubeVideoId(video?.youtube_video_id || video?.youtube_id);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
};

export const getVideoSizing = (video) => {
  if (video?.width_percentage && video?.height_pixels) {
    return {
      cardStyle: {
        width: `${video.width_percentage}%`,
        maxWidth: '100%',
      },
      frameStyle: {
        height: `${video.height_pixels}px`,
      },
    };
  }

  const sizeMap = {
    small: { maxWidth: '300px', aspectRatio: '3 / 2' },
    medium: { maxWidth: '400px', aspectRatio: '4 / 3' },
    large: { maxWidth: '600px', aspectRatio: '3 / 2' },
    extra_large: { maxWidth: '800px', aspectRatio: '8 / 5' },
    full_width: { maxWidth: '100%', aspectRatio: '16 / 9' },
  };

  const selectedSize = sizeMap[video?.display_size] || sizeMap.medium;
  return {
    cardStyle: {
      width: '100%',
      maxWidth: selectedSize.maxWidth,
    },
    frameStyle: {
      aspectRatio: selectedSize.aspectRatio,
    },
  };
};

export const getPhotoSizing = (photo) => {
  const borderRadius = `${photo?.border_radius ?? 12}px`;

  if (photo?.width_pixels && photo?.height_pixels) {
    return {
      width: '100%',
      maxWidth: `${photo.width_pixels}px`,
      height: `${photo.height_pixels}px`,
      borderRadius,
    };
  }

  const sizeMap = {
    thumbnail: { maxWidth: '150px', aspectRatio: '1 / 1' },
    small: { maxWidth: '250px', aspectRatio: '5 / 4' },
    medium: { maxWidth: '400px', aspectRatio: '4 / 3' },
    large: { maxWidth: '600px', aspectRatio: '4 / 3' },
    extra_large: { maxWidth: '800px', aspectRatio: '4 / 3' },
    full_width: { maxWidth: '100%', aspectRatio: '16 / 10' },
    square_small: { maxWidth: '200px', aspectRatio: '1 / 1' },
    square_medium: { maxWidth: '300px', aspectRatio: '1 / 1' },
    square_large: { maxWidth: '500px', aspectRatio: '1 / 1' },
  };

  const selectedSize = sizeMap[photo?.display_size] || sizeMap.medium;
  return {
    width: '100%',
    maxWidth: selectedSize.maxWidth,
    aspectRatio: selectedSize.aspectRatio,
    borderRadius,
  };
};

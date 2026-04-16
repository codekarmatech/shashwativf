const unique = (values) => [...new Set(values.filter(Boolean))];

export const normalizeBlogPost = (post) => {
  if (!post) {
    return null;
  }

  return {
    ...post,
    tags: Array.isArray(post.tags) ? post.tags : [],
    readTime: post.read_time || post.readTime || '',
    publishDate: post.publish_date || post.publishDate || '',
    featuredImage: post.featured_image || post.featuredImage || post.image || '',
  };
};

export const normalizeBlogPosts = (posts = []) => posts.map(normalizeBlogPost).filter(Boolean);

export const normalizeSuccessStory = (story) => {
  if (!story) {
    return null;
  }

  return {
    ...story,
    patientInitials: story.patient_initials || story.patientInitials || '',
  };
};

export const normalizeSuccessStories = (stories = []) => stories.map(normalizeSuccessStory).filter(Boolean);

export const normalizeService = (service) => {
  if (!service) {
    return null;
  }

  return {
    ...service,
    shortDescription: service.short_description || service.shortDescription || '',
    detailedDescription: service.detailed_description || service.detailedDescription || '',
    successRate: service.success_rate || service.successRate || '',
    idealAge: service.ideal_age || service.idealAge || '',
    processSteps: service.process_steps || service.processSteps || [],
  };
};

export const normalizeServices = (services = []) => services.map(normalizeService).filter(Boolean);

export const buildCategoryList = (items = [], key = 'category') => [
  'All',
  ...unique(items.map((item) => item?.[key])),
];

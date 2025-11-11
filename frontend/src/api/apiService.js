// API Service for Django Backend Integration
// This file will handle all API calls to the Django backend

class ApiService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api'; // Django backend URL
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        ...this.headers,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Services API
  async getServices() {
    const response = await this.get('/services/');
    // Handle paginated response - return results array
    return response.results || response;
  }

  async getService(slug) {
    return this.get(`/services/${slug}/`);
  }

  // Doctors API
  async getDoctors() {
    const response = await this.get('/doctors/');
    // Handle paginated response - return results array
    return response.results || response;
  }

  async getDoctor(id) {
    return this.get(`/doctors/${id}/`);
  }

  // Blog API
  async getBlogPosts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await this.get(`/blog/posts/${queryString ? `?${queryString}` : ''}`);
    return response.results || response;
  }

  async getBlogPost(slug) {
    return this.get(`/blog/posts/${slug}/`);
  }

  // Success Stories API
  async getSuccessStories(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await this.get(`/blog/stories/${queryString ? `?${queryString}` : ''}`);
    return response.results || response;
  }

  // Media API
  async getMediaContent(type = null) {
    const endpoint = type ? `/media/?type=${type}` : '/media/';
    return this.get(endpoint);
  }

  async getMediaVideos() {
    const response = await this.get('/media/videos/');
    return response.results || response;
  }

  async getMediaPhotos() {
    const response = await this.get('/media/photos/');
    return response.results || response;
  }

  async getAcademicExcellence() {
    const response = await this.get('/media/academic/');
    return response.results || response;
  }

  async getGlobalMissions() {
    const response = await this.get('/media/missions/');
    return response.results || response;
  }

  async getPressCoverage() {
    const response = await this.get('/media/press/');
    return response.results || response;
  }

  // Contact API
  async submitContactForm(data) {
    return this.post('/contact/submissions/', data);
  }

  // Newsletter API
  async subscribeNewsletter(email) {
    return this.post('/contact/newsletter/', { email });
  }

  // Clinic Info API
  async getClinicInfo() {
    const response = await this.get('/contact/clinic-info/');
    // Return first result if it's an array
    return response.results?.[0] || response[0] || response;
  }

  // Team API
  async getTeamMembers(category = null) {
    const endpoint = category ? `/doctors/team/?category=${category}` : '/doctors/team/';
    const response = await this.get(endpoint);
    return response.results || response;
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export individual methods for convenience
export const {
  getServices,
  getService,
  getDoctors,
  getDoctor,
  getBlogPosts,
  getBlogPost,
  getSuccessStories,
  getMediaContent,
  submitContactForm,
  subscribeNewsletter,
  getClinicInfo,
  getTeamMembers,
} = apiService;

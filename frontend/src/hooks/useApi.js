import { useState, useEffect } from 'react';
import apiService from '../api/apiService';

// Generic API hook for data fetching with loading and error states
export const useApiData = (apiMethod, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Use the singleton instance directly, not 'new ApiService()'
        const result = await apiService[apiMethod]();
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error(`API Error (${apiMethod}):`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};

// Specific hooks for different data types
export const useDoctors = () => {
  return useApiData('getDoctors');
};

export const useLeaders = () => {
  const { data: doctors, loading, error } = useDoctors();
  const leaders = doctors?.filter(doctor => doctor.is_leader) || [];
  return { data: leaders, loading, error };
};

export const useTeamMembers = () => {
  return useApiData('getTeamMembers');
};

export const useServices = () => {
  return useApiData('getServices');
};

export const useService = (slug) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiService.getService(slug);
        setService(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchService();
    }
  }, [slug]);

  return { data: service, loading, error };
};

export const useBlogPosts = () => {
  return useApiData('getBlogPosts');
};

export const useBlogPost = (slug) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiService.getBlogPost(slug);
        setPost(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return { data: post, loading, error };
};

export const useSuccessStories = () => {
  return useApiData('getSuccessStories');
};

export const useMediaVideos = () => {
  return useApiData('getMediaVideos');
};

export const useMediaPhotos = () => {
  return useApiData('getMediaPhotos');
};

export const useAcademicExcellence = () => {
  return useApiData('getAcademicExcellence');
};

export const useGlobalMissions = () => {
  return useApiData('getGlobalMissions');
};

export const usePressCoverage = () => {
  return useApiData('getPressCoverage');
};

export const useClinicInfo = () => {
  return useApiData('getClinicInfo');
};

// Combined media hook
export const useMediaData = () => {
  const { data: videos, loading: videosLoading, error: videosError } = useMediaVideos();
  const { data: photos, loading: photosLoading, error: photosError } = useMediaPhotos();
  const { data: academic, loading: academicLoading, error: academicError } = useAcademicExcellence();
  const { data: missions, loading: missionsLoading, error: missionsError } = useGlobalMissions();
  const { data: press, loading: pressLoading, error: pressError } = usePressCoverage();

  const loading = videosLoading || photosLoading || academicLoading || missionsLoading || pressLoading;
  const error = videosError || photosError || academicError || missionsError || pressError;

  return {
    data: {
      videos: videos || [],
      photos: photos || [],
      academic: academic || [],
      missions: missions || [],
      press: press || []
    },
    loading,
    error
  };
};

// Hook with fallback to mock data
export const useApiWithFallback = (apiMethod, mockData, dependencies = []) => {
  const { data, loading, error } = useApiData(apiMethod, dependencies);
  
  return {
    data: data || mockData,
    loading,
    error,
    isUsingMockData: !data && mockData
  };
};

import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; // Make sure this matches your server configuration

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const createPost = async (formData) => {
  try {
    const response = await api.post('/posts/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in createPost:', error.response?.data || error.message);
    throw error;
  }
};

export const getPosts = () => api.get('/posts');
export const likePost = (postId) => api.post(`/posts/${postId}/like`);
export const updateProfile = (profileData) => api.put('/profile', profileData);
export const getProfile = (username) => api.get(`/profile/${username}`);

export default api;
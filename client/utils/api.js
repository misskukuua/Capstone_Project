// utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProfile = async (username) => {
  try {
    const response = await api.get(`/profile/${username}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/profile', profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
};

// Post APIs
export const createPost = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/posts/create`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      // Don't set Content-Type header when sending FormData
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  });
  return handleResponse(response);
};



export const getPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return handleResponse(response);
};

export const likePost = async (postId) => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return handleResponse(response);
};

// Comment APIs
export const createComment = async (postId, content) => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comment`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ content })
  });
  return handleResponse(response);
};

export const getComments = async (postId) => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return handleResponse(response);
};


export default api;
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const convertUrl = async (url) => {
  try {
    const response = await api.post('/convert', {
      url
    });
    console.log("response from convert", response)
    return response.data;
  } catch (error) {
    const message = error.response?.data?.detail || 'An unexpected error occurred. Please try again.';
    throw new Error(message);
  }
};

export default api;

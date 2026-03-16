import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchSkills = async () => {
  const { data } = await api.get('/skills');
  return data.data;
};

export const fetchProjects = async (params = {}) => {
  const { data } = await api.get('/projects', { params });
  return data.data;
};

export const sendContact = async (formData) => {
  const { data } = await api.post('/contact', formData);
  return data;
};

export default api;

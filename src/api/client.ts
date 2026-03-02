import axios, { type AxiosInstance } from 'axios';

export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20_000
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('dna-nexus-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

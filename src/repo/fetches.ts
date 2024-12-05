import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../config/const';
import { IPagination } from '../app/type';

// Base Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to set Bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Generic GET request
export const get = async <T>(
  url: string,
  pagination: IPagination = { limit: 10, skip: 1 },
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.get<T>(
    `${url}?p=${pagination.skip}&s=${pagination.limit}`,
    config
  );
  return response.data;
};

// Generic POST request
export const post = async <T>(
  url: string,
  data: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
};

// Generic PUT request
export const put = async <T>(
  url: string,
  data: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
};

// Generic DELETE request
export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
};

export default apiClient;

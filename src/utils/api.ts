import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { useAuthStore } from '@/store/authStore';

// API Configuration
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com';
const API_TIMEOUT = 30000; // 30 seconds

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get auth token from store
    const { user } = useAuthStore.getState();

    // Add authorization header if token exists
    if (user?.id) {
      // Replace with actual token when available
      // config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (__DEV__) {
      console.log(
        `🚀 [API Request] ${config.method?.toUpperCase()} ${config.url}`,
        config.data || ''
      );
    }

    return config;
  },
  (error: AxiosError) => {
    if (__DEV__) {
      console.error('❌ [API Request Error]', error.message);
    }
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (__DEV__) {
      console.log(
        `✅ [API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
        response.status
      );
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Log error in development
    if (__DEV__) {
      console.error(
        `❌ [API Response Error] ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`,
        error.response?.status,
        error.message
      );
    }

    // Handle 401 Unauthorized - logout user
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      // Logout user and redirect to login
      const { logout } = useAuthStore.getState();
      logout();

      // Optionally: Attempt token refresh here before logging out
      // const newToken = await refreshToken();
      // if (newToken) {
      //   originalRequest.headers.Authorization = `Bearer ${newToken}`;
      //   return api(originalRequest);
      // }
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('Resource not found');
    }

    // Handle 500 Internal Server Error
    if (error.response?.status === 500) {
      console.error('Server error');
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error - please check your connection');
    }

    return Promise.reject(error);
  }
);

// API Helper Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

// API Helper Methods
export const apiHelper = {
  get: <T>(url: string, params?: object) =>
    api.get<ApiResponse<T>>(url, { params }),

  post: <T>(url: string, data?: object) => api.post<ApiResponse<T>>(url, data),

  put: <T>(url: string, data?: object) => api.put<ApiResponse<T>>(url, data),

  patch: <T>(url: string, data?: object) =>
    api.patch<ApiResponse<T>>(url, data),

  delete: <T>(url: string) => api.delete<ApiResponse<T>>(url),
};

// Export the axios instance as default
export default api;

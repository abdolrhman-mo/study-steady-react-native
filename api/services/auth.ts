import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const login = async (username: string, password: string) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, { username, password });
    return response.data; // Adjust based on your API's response structure
  } catch (error:any) {
    throw error.response?.data || 'Login failed';
  }
};

export const signup = async (first_name: string, last_name: string, username: string, password: string) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, { first_name, last_name, username, password });
    return response.data;
  } catch (error:any) {
    throw error.response?.data || 'Signup failed';
  }
};

import apiClient from '../client';

export const login = async (username: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data; // Adjust based on your API's response structure
  } catch (error:any) {
    throw error.response?.data || 'Login failed';
  }
};

export const signup = async (username: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/signup', { username, password });
    return response.data;
  } catch (error:any) {
    throw error.response?.data || 'Signup failed';
  }
};

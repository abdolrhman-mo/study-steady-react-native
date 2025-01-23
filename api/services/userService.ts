import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const getUsers = async () => {
  const response = await apiClient.get(API_ENDPOINTS.USERS);
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await apiClient.get(`${API_ENDPOINTS.USERS}/${id}`);
  return response.data;
};

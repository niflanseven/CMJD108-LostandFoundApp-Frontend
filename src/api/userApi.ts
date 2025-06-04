import apiClient from '../utils/apiClient';
import { User } from '../types/types';

export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get('/secure/users/profile');
  return response.data;
};

export const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
  const response = await apiClient.put('/secure/users/profile', userData);
  return response.data;
};
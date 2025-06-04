import apiClient from '../utils/apiClient';
import { LoginData, PasswordChangeData, RegisterData } from '../types/types';

export const login = async (data: LoginData) => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterData) => {
  const response = await apiClient.post('/auth/register', data);
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem('token');
};

export const changePassword = async (data: PasswordChangeData) => {
  const response = await apiClient.post('/secure/users/change-password', data);
  return response.data;
};
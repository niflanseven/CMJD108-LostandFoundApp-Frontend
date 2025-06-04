import apiClient from '../utils/apiClient';
import { Item } from '../types/types';

export const getItems = async () => {
  const response = await apiClient.get('/secure/items');
  return response.data;
};

export const createItem = async (item: Omit<Item, 'id'>) => {
  const response = await apiClient.post('/secure/items', item);
  return response.data;
};

export const updateItem = async (id: number, item: Partial<Item>) => {
  const response = await apiClient.put(`/secure/items/${id}`, item);
  return response.data;
};

export const deleteItem = async (id: number) => {
  const response = await apiClient.delete(`/secure/items/${id}`);
  return response.data;
};
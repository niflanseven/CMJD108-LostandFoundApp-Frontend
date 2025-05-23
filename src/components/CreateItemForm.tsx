import React, { useState } from 'react';
import api from '../api/client';
import { Item } from '../types/types';

interface CreateItemFormProps {
  onItemCreated: () => void;
}

const CreateItemForm: React.FC<CreateItemFormProps> = ({ onItemCreated }) => {
  const [formData, setFormData] = useState<Omit<Item, 'id'>>({
    title: '',
    description: '',
    location: '',
    status: 'LOST',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/secure/items', formData);
      onItemCreated();
      setFormData({ title: '', description: '', location: '', status: 'LOST' });
    } catch (err) {
      setError('Failed to create item');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Create New Item</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="LOST">Lost</option>
            <option value="FOUND">Found</option>
            <option value="CLAIMED">Claimed</option>
          </select>
        </div>
        <button type="submit">Create Item</button>
      </form>
    </div>
  );
};

export default CreateItemForm;
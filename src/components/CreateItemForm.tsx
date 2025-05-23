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
    <div className="create-item-form">
      <h2>Report New Item</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
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
        <button type="submit" className="submit-button">
          Create Item
        </button>
      </form>
    </div>
  );
};

export default CreateItemForm;
import React, { useState } from 'react';
import api from '../api/client';
import { Item } from '../types/types';

interface ItemCardProps {
  item: Item;
  onItemUpdated: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onItemUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(item);
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    try {
      await api.put(`/secure/items/${item.id}`, formData);
      onItemUpdated();
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update item');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/secure/items/${item.id}`);
      onItemUpdated();
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="item-card">
      {isEditing ? (
        <div className="edit-form">
          <div className="form-group">
            <label>Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
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
          <div className="button-group">
            <button onClick={handleUpdate} className="save-button">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="item-details">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className="item-meta">
            <span className="location">{item.location}</span>
            <span className={`status ${item.status.toLowerCase()}`}>
              {item.status}
            </span>
          </div>
          <div className="button-group">
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Edit
            </button>
            <button onClick={handleDelete} className="delete-button">
              Delete
            </button>
          </div>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ItemCard;
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
        <div>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {/* Add other editable fields */}
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p><strong>Status:</strong> {item.status}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ItemCard;
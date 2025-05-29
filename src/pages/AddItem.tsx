import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

const AddItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'LOST' | 'FOUND'>('LOST');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/secure/items', { title, description, status });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to add item');
    }
  };

  return (
    <div>
      <h1>Add New Item</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value as 'LOST' | 'FOUND')}
        >
          <option value="LOST">Lost</option>
          <option value="FOUND">Found</option>
        </select>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
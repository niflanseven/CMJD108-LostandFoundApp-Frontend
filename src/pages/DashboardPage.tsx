import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { Item } from '../types/types';
import CreateItemForm from '../components/CreateItemForm';

const DashboardPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const response = await api.get('/secure/items');
      setItems(response.data);
    } catch (err) {
      console.error('Failed to fetch items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lost & Found Items</h1>
      <button onClick={handleLogout}>Logout</button>
      
      <CreateItemForm onItemCreated={fetchItems} />
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ 
            border: '1px solid #ddd', 
            padding: '10px', 
            margin: '10px 0' 
          }}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Status:</strong> {item.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
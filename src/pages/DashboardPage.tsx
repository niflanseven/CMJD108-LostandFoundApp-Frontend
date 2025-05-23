import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { Item } from '../types/types';
import CreateItemForm from '../components/CreateItemForm';
import ItemList from '../components/ItemList';
import '../index.css';

const DashboardPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch items from API
  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await api.get('/secure/items');
      setItems(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load items. Please try again later.');
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchItems();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Lost & Found Management</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        {error && <div className="error-message">{error}</div>}

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <CreateItemForm onItemCreated={fetchItems} />

        {loading ? (
          <div className="loading-spinner">Loading items...</div>
        ) : (
          <ItemList 
            items={filteredItems} 
            onItemUpdated={fetchItems} 
          />
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
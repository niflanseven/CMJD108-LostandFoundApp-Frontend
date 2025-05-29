import { useEffect, useState } from 'react';
import apiClient from '../api/client';

interface Item {
  id: number;
  title: string;
  description: string;
  status: 'LOST' | 'FOUND' | 'CLAIMED';
}

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await apiClient.get('/secure/items');
        setItems(response.data);
      } catch (err) {
        setError('Failed to fetch items');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Status: {item.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
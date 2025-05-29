import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemList from '../components/ItemList';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Force full page reload
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <ItemList />
    </div>
  );
};

export default Dashboard;
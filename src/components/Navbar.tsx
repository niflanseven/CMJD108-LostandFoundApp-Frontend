import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
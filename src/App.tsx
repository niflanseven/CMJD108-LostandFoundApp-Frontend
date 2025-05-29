import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          localStorage.getItem('token') ? <Navigate to="/dashboard" /> : <Login />
        } />
        <Route path="/register" element={
          localStorage.getItem('token') ? <Navigate to="/dashboard" /> : <Register />
        } />

        {/* Protected routes */}
        <Route path="/dashboard" element={
          localStorage.getItem('token') ? <Dashboard /> : <Navigate to="/login" />
        } />
        
        {/* Default redirect */}
        <Route path="/" element={
          localStorage.getItem('token') ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
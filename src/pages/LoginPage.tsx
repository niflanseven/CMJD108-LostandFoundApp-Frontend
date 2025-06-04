import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Paper } from '@mui/material';
import LoginForm from '../components/auth/LoginFrom';
import { login } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import AlertSnackbar from '../components/ui/AlertSnackbar';
import { LoginData } from '../types/types';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    setError('');
    
    try {
      const token = await login(data);
      authLogin(token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" mb={3}>
            Lost & Found System
          </Typography>
          
          <Typography component="h2" variant="h5" align="center" mb={4}>
            Sign in to your account
          </Typography>
          
          <LoginForm onSubmit={handleLogin} loading={loading} />
        </Paper>
        
        <AlertSnackbar 
          open={!!error} 
          message={error} 
          severity="error" 
          onClose={() => setError('')} 
        />
      </Box>
    </Container>
  );
};

export default LoginPage;
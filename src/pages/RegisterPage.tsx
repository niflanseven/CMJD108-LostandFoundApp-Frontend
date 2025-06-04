import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Paper } from '@mui/material';
import RegisterForm from '../components/auth/RegisterFrom';
import { register } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import AlertSnackbar from '../components/ui/AlertSnackbar';

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (data: any) => {
    setLoading(true);
    setError('');
    
    try {
      const token = await register(data);
      authLogin(token);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration failed:', err);
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
            Create an Account
          </Typography>
          
          <RegisterForm onSubmit={handleRegister} loading={loading} />
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

export default RegisterPage;
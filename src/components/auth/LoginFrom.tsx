import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Box, Typography, Link } from '@mui/material';
import { LoginData } from '../../types/types';

interface LoginFormProps {
  onSubmit: (data: LoginData) => void;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginData>();

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      sx={{ mt: 3, width: '100%' }}
    >
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        type="email"
        {...register('email', { 
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        {...register('password', { 
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ mt: 3, mb: 2 }}
      >
        {loading ? 'Logging in...' : 'Sign In'}
      </Button>
      
      <Box textAlign="center">
        <Link href="/register" variant="body2">
          Don't have an account? Sign Up
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
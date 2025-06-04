import React from 'react';
import { useForm } from 'react-hook-form';
import { 
  Button, 
  TextField, 
  Box, 
  Typography,
  Link,
  MenuItem
} from '@mui/material';
import { RegisterData } from '../../types/types';

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => void;
  loading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<RegisterData>();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        {...register('name', { required: 'Name is required' })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      
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
      
      <TextField
        fullWidth
        margin="normal"
        select
        label="Role"
        defaultValue="USER"
        {...register('role', { required: 'Role is required' })}
      >
        <MenuItem value="USER">User</MenuItem>
        <MenuItem value="STAFF">Staff</MenuItem>
        <MenuItem value="ADMIN">Admin</MenuItem>
      </TextField>
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ mt: 3, mb: 2 }}
      >
        {loading ? 'Registering...' : 'Sign Up'}
      </Button>
      
      <Box textAlign="center">
        <Link href="/login" variant="body2">
          Already have an account? Sign In
        </Link>
      </Box>
    </Box>
  );
};

export default RegisterForm;
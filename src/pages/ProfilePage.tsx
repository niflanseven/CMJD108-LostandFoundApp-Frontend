import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { changePassword } from '../api/authApi';
import AlertSnackbar from '../components/ui/AlertSnackbar';
import { PasswordChangeData } from '../types/types';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<PasswordChangeData>();

  const handlePasswordChange = async (data: PasswordChangeData) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await changePassword(data);
      setSuccess('Password changed successfully');
      reset();
    } catch (err) {
      setError('Failed to change password. Please check your current password.');
      console.error('Password change failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            User Profile
          </Typography>
          
          <Box mb={4}>
            <Typography variant="body1"><strong>Name:</strong> {user.name}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
            <Typography variant="body1"><strong>Role:</strong> {user.role}</Typography>
          </Box>
          
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          
          <Box 
            component="form" 
            onSubmit={handleSubmit(handlePasswordChange)} 
            sx={{ mt: 2 }}
          >
            <TextField
              fullWidth
              margin="normal"
              label="Current Password"
              type="password"
              {...register('currentPassword', { 
                required: 'Current password is required'
              })}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword?.message}
            />
            
            <TextField
              fullWidth
              margin="normal"
              label="New Password"
              type="password"
              {...register('newPassword', { 
                required: 'New password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? 'Changing Password...' : 'Change Password'}
            </Button>
          </Box>
        </Paper>
        
        <AlertSnackbar 
          open={!!error} 
          message={error} 
          severity="error" 
          onClose={() => setError('')} 
        />
        <AlertSnackbar 
          open={!!success} 
          message={success} 
          severity="success" 
          onClose={() => setSuccess('')} 
        />
      </Box>
    </Container>
  );
};

export default ProfilePage;
import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Box sx={{ 
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 3,
        mb: 3
      }}>
        <Paper sx={{ p: 3, flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Welcome, {user?.name}
          </Typography>
          <Typography variant="body1">
            You are logged in as {user?.role}.
          </Typography>
        </Paper>
        
        <Paper sx={{ p: 3, flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              color="primary"
              href="/items"
            >
              View Items
            </Button>
            <Button 
              variant="outlined" 
              color="primary"
              href="/profile"
            >
              My Profile
            </Button>
          </Box>
        </Paper>
      </Box>
    </DashboardLayout>
  );
};

export default DashboardPage;
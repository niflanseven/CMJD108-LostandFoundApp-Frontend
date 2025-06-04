import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  Chip,
  Stack
} from '@mui/material';
import { Item } from '../../types/types';
import { format } from 'date-fns';

interface ItemCardProps {
  item: Item;
  onEdit: () => void;
  onDelete: () => void;
  userRole: string | undefined;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete, userRole }) => {
  const getStatusColor = () => {
    switch (item.status) {
      case 'LOST': return 'error';
      case 'FOUND': return 'info';
      case 'CLAIMED': return 'success';
      default: return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            {item.title}
          </Typography>
          <Chip 
            label={item.status} 
            color={getStatusColor()} 
            size="small"
          />
        </Stack>
        
        <Typography variant="body2" color="text.secondary" mt={1}>
          {item.description}
        </Typography>
        
        <Typography variant="body2" mt={2}>
          <strong>Location:</strong> {item.location}
        </Typography>
        
        <Typography variant="body2">
          <strong>Date:</strong> {format(new Date(item.date), 'MMM dd, yyyy')}
        </Typography>
        
        <Typography variant="body2" mt={1}>
          <strong>Reported by:</strong> {item.user?.name || 'Unknown'}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ mt: 'auto', justifyContent: 'flex-end' }}>
        <Button size="small" onClick={onEdit}>Edit</Button>
        {userRole === 'ADMIN' && (
          <Button size="small" color="error" onClick={onDelete}>Delete</Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ItemCard;

import React from 'react';
import { Box } from '@mui/material';
import ItemCard from './ItemCard';
import { Item } from '../../types/types';

interface ItemListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
  userRole: string | undefined;
}

const ItemList: React.FC<ItemListProps> = ({ items, onEdit, onDelete, userRole }) => {
  return (
    <Box sx={{ 
      display: 'flex',
      flexWrap: 'wrap',
      gap: 3,
      justifyContent: 'center'
    }}>
      {items.map((item) => (
        <Box key={item.id} sx={{ width: 300 }}>
          <ItemCard 
            item={item} 
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item.id)}
            userRole={userRole}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ItemList;

import React, { useState, useEffect } from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import ItemList from '../components/items/ItemList';
import ItemForm from '../components/items/ItemForm';
import { getItems, createItem, updateItem, deleteItem } from '../api/itemApi';
import { Item } from '../types/types';
import AlertSnackbar from '../components/ui/AlertSnackbar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

interface ItemFormData {
  title: string;
  description: string;
  location: string;
  status: 'LOST' | 'FOUND' | 'CLAIMED';
}

const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getItems();
      setItems(data);
    } catch (err) {
      setError('Failed to load items');
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (itemData: ItemFormData) => {
  try {
    if (currentItem) {
      const updatedItem = await updateItem(currentItem.id, {
        ...itemData,
        date: currentItem.date,
      });
      setItems(items.map(i => (i.id === currentItem.id ? updatedItem : i)));
      setSuccess('Item updated successfully');
    } else {
      const newItem = await createItem({
        ...itemData,
        user: user,
        date: new Date().toISOString(),
      });
      setItems([...items, newItem]);
      setSuccess('Item created successfully');
    }
    setOpenForm(false);
    setCurrentItem(null);
  } catch (err) {
    setError(currentItem ? 'Failed to update item' : 'Failed to create item');
    console.error('Error saving item:', err);
  }
};


  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id);
        setItems(items.filter(item => item.id !== id));
        setSuccess('Item deleted successfully');
      } catch (err) {
        setError('Failed to delete item');
        console.error('Error deleting item:', err);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Lost & Found Items</Typography>
        {user?.role !== 'USER' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setCurrentItem(null);
              setOpenForm(true);
            }}
          >
            Add New Item
          </Button>
        )}
      </Box>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <ItemList
          items={items}
          onEdit={(item: Item) => {
            setCurrentItem(item);
            setOpenForm(true);
          }}
          onDelete={handleDelete}
          userRole={user?.role}
        />
      )}

      <ItemForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setCurrentItem(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={currentItem}
      />

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
    </Container>
  );
};

export default ItemsPage;

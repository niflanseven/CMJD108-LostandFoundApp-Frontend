import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem
} from '@mui/material';
import { Item, ItemFormData } from '../../types/types';

interface ItemFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ItemFormData) => void | Promise<void>;
  initialData?: Item | null;
}

const ItemForm: React.FC<ItemFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ItemFormData>({
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description ?? '',
      location: initialData?.location ?? '',
      status: initialData?.status ?? 'LOST'
    }
  });

  React.useEffect(() => {
    reset({
      title: initialData?.title ?? '',
      description: initialData?.description ?? '',
      location: initialData?.location ?? '',
      status: initialData?.status ?? 'LOST'
    });
  }, [initialData, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? 'Edit Item' : 'Create New Item'}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            {...register('title', { required: 'Title is required' })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Description"
            multiline
            rows={4}
            {...register('description', { required: 'Description is required' })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Location"
            {...register('location', { required: 'Location is required' })}
            error={!!errors.location}
            helperText={errors.location?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            select
            label="Status"
            {...register('status', { required: 'Status is required' })}
            defaultValue="LOST"
          >
            <MenuItem value="LOST">Lost</MenuItem>
            <MenuItem value="FOUND">Found</MenuItem>
            <MenuItem value="CLAIMED">Claimed</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" color="primary">
            {initialData ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ItemForm;

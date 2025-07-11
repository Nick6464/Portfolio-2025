import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Link,
  Grid,
  Chip,
} from '@mui/material';
import { Delete, Edit, Add, Launch } from '@mui/icons-material';
import type { SupplierEntry } from './types';

const SupplierNotebook: React.FC = () => {
  const [suppliers, setSuppliers] = useState<SupplierEntry[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: '',
    notes: '',
  });

  const categories = [
    '3D Printing',
    'PET Sheet',
    'Chicken Wire',
    'Cable Ties',
    'Sphagnum Moss',
    'Other',
  ];

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('moss-pole-suppliers');
    if (saved) {
      try {
        setSuppliers(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading suppliers:', error);
      }
    }
  }, []);

  // Save to localStorage whenever suppliers change
  useEffect(() => {
    localStorage.setItem('moss-pole-suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  const handleAdd = () => {
    if (!formData.name || !formData.url) return;

    const newSupplier: SupplierEntry = {
      id: Date.now().toString(),
      name: formData.name,
      url: formData.url,
      category: formData.category || 'Other',
      notes: formData.notes,
    };

    setSuppliers([...suppliers, newSupplier]);
    setFormData({ name: '', url: '', category: '', notes: '' });
    setIsAdding(false);
  };

  const handleEdit = (supplier: SupplierEntry) => {
    setFormData({
      name: supplier.name,
      url: supplier.url,
      category: supplier.category,
      notes: supplier.notes || '',
    });
    setEditingId(supplier.id);
    setIsAdding(true);
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.url || !editingId) return;

    setSuppliers(
      suppliers.map(supplier =>
        supplier.id === editingId ? { ...supplier, ...formData } : supplier
      )
    );
    setFormData({ name: '', url: '', category: '', notes: '' });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
  };

  const handleCancel = () => {
    setFormData({ name: '', url: '', category: '', notes: '' });
    setEditingId(null);
    setIsAdding(false);
  };

  const groupedSuppliers = suppliers.reduce((groups, supplier) => {
    const category = supplier.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(supplier);
    return groups;
  }, {} as Record<string, SupplierEntry[]>);

  return (
    <Box maxWidth="md" sx={{ mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          📝 Supplier Notebook
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Keep track of where you source your moss pole materials
        </Typography>

        {/* Add/Edit Form */}
        {isAdding && (
          <Paper variant="outlined" sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
            <Typography variant="h6" gutterBottom>
              {editingId ? 'Edit Supplier' : 'Add New Supplier'}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Supplier Name"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., FilamentOne, Bunnings"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Category"
                  select
                  SelectProps={{ native: true }}
                  value={formData.category}
                  onChange={e =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="URL"
                  value={formData.url}
                  onChange={e =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  placeholder="https://..."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={2}
                  value={formData.notes}
                  onChange={e =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Price notes, product details, etc."
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    onClick={editingId ? handleUpdate : handleAdd}
                    disabled={!formData.name || !formData.url}
                  >
                    {editingId ? 'Update' : 'Add'}
                  </Button>
                  <Button variant="outlined" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Add Button */}
        {!isAdding && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setIsAdding(true)}
            sx={{ mb: 3 }}
          >
            Add Supplier
          </Button>
        )}

        {/* Suppliers List */}
        {suppliers.length === 0 ? (
          <Paper
            variant="outlined"
            sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}
          >
            <Typography variant="h6" gutterBottom>
              No suppliers yet
            </Typography>
            <Typography variant="body2">
              Add your first supplier to get started tracking material sources
            </Typography>
          </Paper>
        ) : (
          Object.entries(groupedSuppliers).map(
            ([category, categorySuppliers]) => (
              <Box key={category} sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  {category}
                  <Chip
                    label={categorySuppliers.length}
                    size="small"
                    color="primary"
                  />
                </Typography>
                <Paper variant="outlined">
                  <List>
                    {categorySuppliers.map((supplier, index) => (
                      <React.Fragment key={supplier.id}>
                        <ListItem>
                          <ListItemText
                            primary={
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                }}
                              >
                                <Typography variant="subtitle1">
                                  {supplier.name}
                                </Typography>
                                <IconButton
                                  size="small"
                                  href={supplier.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  color="primary"
                                >
                                  <Launch fontSize="small" />
                                </IconButton>
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Link
                                  href={supplier.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  color="text.secondary"
                                  sx={{
                                    fontSize: '0.875rem',
                                    display: 'block',
                                    mb: supplier.notes ? 0.5 : 0,
                                  }}
                                >
                                  {supplier.url}
                                </Link>
                                {supplier.notes && (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {supplier.notes}
                                  </Typography>
                                )}
                              </Box>
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              onClick={() => handleEdit(supplier)}
                              sx={{ mr: 1 }}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              edge="end"
                              onClick={() => handleDelete(supplier.id)}
                              color="error"
                            >
                              <Delete />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        {index < categorySuppliers.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              </Box>
            )
          )
        )}

        {/* Storage Info */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 2, display: 'block' }}
        >
          💾 Data is automatically saved to your browser's local storage
        </Typography>
      </Paper>
    </Box>
  );
};

export default SupplierNotebook;

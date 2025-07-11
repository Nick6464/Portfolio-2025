import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Collapse,
  Chip,
  Typography,
} from '@mui/material';
import {
  Add,
  Delete,
  ExpandMore,
  ExpandLess,
  Link as LinkIcon,
} from '@mui/icons-material';
import type { PriceSource } from './types';

interface PriceSourceSectionProps {
  section: string;
  sources: PriceSource[];
  expanded: boolean;
  showNewForm: boolean;
  onToggleSection: (section: string) => void;
  onToggleNewForm: (section: string) => void;
  onAddSource: (section: string, source: PriceSource) => void;
  onRemoveSource: (section: string, id: string) => void;
}

const PriceSourceSection: React.FC<PriceSourceSectionProps> = ({
  section,
  sources,
  expanded,
  showNewForm,
  onToggleSection,
  onToggleNewForm,
  onAddSource,
  onRemoveSource,
}) => {
  const getSectionPrefix = (section: string) => {
    const prefixes: Record<string, string> = {
      filament: 'PLA Filament',
      petSheet: 'PET Sheet',
      chickenWire: 'Chicken Wire',
      cableTies: 'Cable Ties',
      moss: 'Sphagnum Moss',
    };
    return prefixes[section] || '';
  };

  const [formData, setFormData] = useState({
    item: '',
    source: '',
    url: '',
    price: '',
    notes: '',
  });

  const handleSubmit = () => {
    if (!formData.item || !formData.source) return;

    const newSource: PriceSource = {
      id: Date.now().toString(),
      ...formData,
    };

    onAddSource(section, newSource);
    setFormData({ item: '', source: '', url: '', price: '', notes: '' });
    onToggleNewForm(section);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button
        size="small"
        onClick={() => onToggleSection(section)}
        endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
        sx={{ mb: 1 }}
      >
        Price Sources{' '}
        {sources.length > 0 && (
          <Chip label={sources.length} size="small" sx={{ ml: 1 }} />
        )}
      </Button>

      <Collapse in={expanded}>
        <Box sx={{ pl: 2, borderLeft: 2, borderColor: 'grey.200' }}>
          {/* Existing Sources */}
          {sources.length > 0 && (
            <List dense>
              {sources.map(source => (
                <ListItem key={source.id} sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Typography variant="body2" fontWeight="medium">
                          {source.item}
                        </Typography>
                        {source.url && (
                          <IconButton
                            size="small"
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <LinkIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="caption" display="block">
                          {source.source} {source.price && `- ${source.price}`}
                        </Typography>
                        {source.notes && (
                          <Typography variant="caption" color="text.secondary">
                            {source.notes}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      size="small"
                      onClick={() => onRemoveSource(section, source.id)}
                      color="error"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}

          {/* Add New Source Form */}
          {showNewForm ? (
            <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Item"
                    value={formData.item}
                    onChange={e =>
                      setFormData({ ...formData, item: e.target.value })
                    }
                    placeholder={
                      getSectionPrefix(section) ||
                      'e.g., PLA Filament, PET Sheet'
                    }
                    onFocus={() => {
                      if (!formData.item && getSectionPrefix(section)) {
                        setFormData({
                          ...formData,
                          item: getSectionPrefix(section),
                        });
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Source"
                    value={formData.source}
                    onChange={e =>
                      setFormData({ ...formData, source: e.target.value })
                    }
                    placeholder="e.g., Bunnings, Amazon"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="URL (optional)"
                    value={formData.url}
                    onChange={e =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Price (optional)"
                    value={formData.price}
                    onChange={e =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="$25/kg, $99.25"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Notes (optional)"
                    value={formData.notes}
                    onChange={e =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Date checked, product code..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={!formData.item || !formData.source}
                    >
                      Add
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => onToggleNewForm(section)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ) : (
            <Button
              size="small"
              startIcon={<Add />}
              onClick={() => onToggleNewForm(section)}
              sx={{ mt: 1 }}
            >
              Add Price Source
            </Button>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default PriceSourceSection;

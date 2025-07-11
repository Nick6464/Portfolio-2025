import React from 'react';
import { Paper, Typography, Grid, TextField } from '@mui/material';

interface InputFieldConfig {
  key: string;
  label: string;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

interface InputSectionProps {
  title: string;
  emoji: string;
  fields: InputFieldConfig[];
  values: Record<string, number>;
  onChange: (key: string, value: number) => void;
  children?: React.ReactNode;
}

const InputSection: React.FC<InputSectionProps> = ({
  title,
  emoji,
  fields,
  values,
  onChange,
  children,
}) => {
  return (
    <Paper
      variant="outlined"
      sx={{ p: 3, mb: 3, borderLeft: 4, borderLeftColor: 'success.main' }}
    >
      <Typography variant="h5" gutterBottom color="success.main">
        {emoji} {title}
      </Typography>
      <Grid container spacing={2}>
        {fields.map(field => (
          <Grid item xs={12} sm={12 / fields.length} key={field.key}>
            <TextField
              fullWidth
              label={field.label}
              type={field.type || 'number'}
              value={values[field.key] || 0}
              onChange={e => onChange(field.key, Number(e.target.value))}
              inputProps={{
                min: field.min,
                max: field.max,
                step: field.step,
              }}
              placeholder={field.placeholder}
            />
          </Grid>
        ))}
      </Grid>
      {children}
    </Paper>
  );
};

export default InputSection;

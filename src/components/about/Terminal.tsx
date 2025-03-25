import React from 'react';
import { Box } from '@mui/material';
import styles from './Terminal.module.scss';

interface TerminalProps {
  children: React.ReactNode;
}

const Terminal: React.FC<TerminalProps> = ({ children }) => {
  return (
    <Box
      className={styles.terminal}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '10px',
        padding: '2rem',
        color: '#fff',
        fontFamily: 'monospace',
        maxWidth: '600px',
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
};

export default Terminal;

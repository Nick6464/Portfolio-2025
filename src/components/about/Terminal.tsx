import React from 'react';
import styles from './Terminal.module.scss';
import classNames from 'classnames';
import { Box } from '@mui/material';

interface TerminalProps {
  text?: React.ReactNode;
  children?: React.ReactNode;
}

const Terminal: React.FC<TerminalProps> = ({ text, children }) => {
  return (
    <Box
      component={'section'}
      className={classNames(styles.terminal, styles.shadowed)}
      width={children ? { xs: '95%', md: '100%' } : { xs: '95%', md: '50%' }}
      borderRadius={'0.5rem'}
      mb={children ? '4rem' : undefined}
    >
      <Box
        sx={{ backgroundColor: '#8c8c8c' }}
        p={'0.5rem'}
        borderRadius={'0.5rem 0.5rem 0 0'}
        fontSize={'1rem'}
        display="flex"
        gap="8px"
      >
        <div className={styles.button} style={{ backgroundColor: '#ff5f56' }} />
        <div className={styles.button} style={{ backgroundColor: '#ffbd2e' }} />
        <div className={styles.button} style={{ backgroundColor: '#27c93f' }} />
      </Box>
      <Box
        py={{ xs: '1rem', md: '2rem' }}
        px={{ xs: '2rem', md: '3rem' }}
        borderRadius={'0 0 0.5rem 0.5rem'}
        sx={{ backgroundColor: '#27242f' }}
        fontSize={'1.5rem'}
        fontFamily={'Courier New, Courier, monospace'}
      >
        {text || children}
      </Box>
    </Box>
  );
};

export default Terminal;

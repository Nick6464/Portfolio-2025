import React from 'react';
import { Box } from '@mui/material';

interface EmojiBulletProps {
  emoji: string;
  text: string;
}

const EmojiBullet: React.FC<EmojiBulletProps> = ({ emoji, text }) => {
  return (
    <Box
      component={'li'}
      display={'flex'}
      alignItems={'center'}
      fontSize={'1rem'}
      pl={'1rem'}
      pr={'1rem'}
      py={'0.5rem'}
      sx={{ cursor: 'default' }}
    >
      <Box
        component={'span'}
        aria-hidden="true"
        mr={'1rem'}
        sx={{ fontSize: '1.5rem' }}
      >
        {emoji}
      </Box>
      <Box component={'span'}>{text}</Box>
    </Box>
  );
};

export default EmojiBullet;

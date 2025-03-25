import React from 'react';
import { Box, Button, Grid2 as Grid, Typography } from '@mui/material';
import Terminal from '../about/Terminal';
import { Code, OpenInNew } from '@mui/icons-material';

interface PortfolioBlockProps {
  image: string;
  live?: string;
  source: string;
  title: string;
}

const PortfolioBlock: React.FC<PortfolioBlockProps> = ({
  image,
  live,
  source,
  title,
}) => {
  return (
    <Terminal>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box
          width={'100%'}
          height={'100%'}
          maxWidth={'500px'}
          maxHeight={'500px'}
          component={'img'}
          src={image}
          alt={'mockup'}
          sx={theme => ({
            borderRadius: 2,
            border: `1px solid ${
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.1)'
            }`,
          })}
        />
        <Typography
          variant="h1"
          sx={theme => ({
            fontSize: '2rem',
            margin: '1.5rem 0',
            fontWeight: 600,
            color: theme.palette.text.primary,
            fontFamily: 'Courier New, Courier, monospace',
          })}
        >
          {title}
        </Typography>
        <Grid
          container
          justifyContent={'center'}
          className={'portfolio'}
          spacing={2}
        >
          {live && (
            <Grid size={6}>
              <Grid container justifyContent={'center'}>
                <Button
                  startIcon={<OpenInNew />}
                  variant="contained"
                  href={live}
                  target="_blank"
                  sx={theme => ({
                    backgroundColor:
                      theme.palette.mode === 'dark' ? '#1D1B23' : '#2C2C2C',
                    color: theme.palette.common.white,
                    fontFamily: 'Courier New, Courier, monospace',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor:
                        theme.palette.mode === 'dark' ? '#2A2833' : '#3C3C3C',
                      transform: 'translateY(-2px)',
                    },
                    padding: '8px 24px',
                  })}
                >
                  Live Demo
                </Button>
              </Grid>
            </Grid>
          )}
          <Grid size={6}>
            <Grid container justifyContent={'center'}>
              <Button
                startIcon={<Code />}
                variant="contained"
                href={source}
                target="_blank"
                sx={theme => ({
                  backgroundColor:
                    theme.palette.mode === 'dark' ? '#1D1B23' : '#2C2C2C',
                  color: theme.palette.common.white,
                  fontFamily: 'Courier New, Courier, monospace',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor:
                      theme.palette.mode === 'dark' ? '#2A2833' : '#3C3C3C',
                    transform: 'translateY(-2px)',
                  },
                  padding: '8px 24px',
                })}
              >
                Source Code
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Terminal>
  );
};

export default PortfolioBlock;

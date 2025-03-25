import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Terminal from '../about/Terminal';
import { Code, OpenInNew } from '@mui/icons-material';
import styles from './PortfolioBlock.module.scss';

interface PortfolioBlockProps {
  image: string;
  live?: string;
  source: string;
  title: string;
}

interface TerminalButtonProps {
  icon?: React.ReactNode;
  href?: string;
  children: React.ReactNode;
}

const TerminalButton = ({ icon, href, children }: TerminalButtonProps) => {
  const buttonProps = {
    startIcon: icon,
    variant: 'contained' as const,
    ...(href ? { href, target: '_blank' as const } : {}),
  };

  return <Button {...buttonProps}>{children}</Button>;
};

const PortfolioBlock: React.FC<PortfolioBlockProps> = ({
  image,
  live,
  source,
  title,
}) => {
  return (
    <Terminal>
      <Box
        className={styles.container}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box
          className={styles.image}
          component={'img'}
          src={image}
          alt={'mockup'}
          sx={theme => ({
            border: `1px solid ${
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.1)'
            }`,
          })}
        />
        <Typography
          className={styles.title}
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
        <Box
          className={styles.buttonContainer}
          sx={{
            display: 'flex',
            gap: 2,
            mt: 2,
          }}
        >
          {live && (
            <TerminalButton icon={<OpenInNew />} href={live}>
              Live Demo
            </TerminalButton>
          )}
          <TerminalButton icon={<Code />} href={source}>
            Source Code
          </TerminalButton>
        </Box>
      </Box>
    </Terminal>
  );
};

export default PortfolioBlock;

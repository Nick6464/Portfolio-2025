import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import Terminal from '../about/Terminal';
import { Code, OpenInNew } from '@mui/icons-material';
import styles from './PortfolioBlock.module.scss';

interface PortfolioBlockProps {
  image: string;
  live?: string;
  source?: string;
  title: string;
  description?: string;
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
  description,
}) => {
  const theme = useTheme();
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
          className={`${styles.imageWrapper} ${
            theme.palette.mode === 'dark' ? styles.imageDark : styles.imageLight
          }`}
        >
          <Box
            className={styles.image}
            component={'img'}
            src={image}
            alt={'mockup'}
          />
        </Box>
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
        {description && (
          <Typography
            sx={theme => ({
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 1rem 1.5rem 1rem',
              color: theme.palette.text.secondary,
              fontFamily: 'Courier New, Courier, monospace',
              fontSize: '1rem',
              lineHeight: 1.5,
            })}
          >
            {description}
          </Typography>
        )}
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
          {source && (
            <TerminalButton icon={<Code />} href={source}>
              Source Code
            </TerminalButton>
          )}
        </Box>
      </Box>
    </Terminal>
  );
};

export default PortfolioBlock;

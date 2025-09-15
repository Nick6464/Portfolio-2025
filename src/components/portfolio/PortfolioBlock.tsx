import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import Terminal from '../about/Terminal';
import { Code, OpenInNew, SvgIconComponent } from '@mui/icons-material';
import styles from './PortfolioBlock.module.scss';

interface PortfolioBlockProps {
  image?: string;
  icon?: SvgIconComponent;
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
  icon,
  live,
  source,
  title,
  description,
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Terminal>
        <Box
          className={styles.container}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'flex-start'}
          alignItems={'center'}
          height={'100%'}
        >
          <Box
            className={`${styles.imageWrapper} ${
              theme.palette.mode === 'dark'
                ? styles.imageDark
                : styles.imageLight
            }`}
          >
            {image ? (
              <Box
                className={styles.image}
                component={'img'}
                src={image}
                alt={'mockup'}
              />
            ) : icon ? (
              <Box
                className={styles.iconContainer}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: theme.palette.primary.main,
                }}
              >
                {React.createElement(icon, { sx: { fontSize: '12rem' } })}
              </Box>
            ) : null}
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
              textAlign: 'center',
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
    </Box>
  );
};

export default PortfolioBlock;

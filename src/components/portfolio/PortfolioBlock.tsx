import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const buttonProps = {
    startIcon: icon,
    variant: 'contained' as const,
    ...(href ? { href, target: '_blank' as const } : {}),
    className: `${styles.terminalButton} ${
      styles[
        `terminalButton${theme.palette.mode === 'dark' ? 'Dark' : 'Light'}`
      ]
    }`,
  };

  return <Button {...buttonProps}>{children}</Button>;
};

const PortfolioBlock: React.FC<PortfolioBlockProps> = ({
  image,
  live,
  source,
  title,
}) => {
  const theme = useTheme();
  return (
    <Terminal>
      <Box className={styles.container}>
        <Box
          component={'img'}
          src={image}
          alt={'mockup'}
          className={`${styles.image} ${
            styles[`image${theme.palette.mode === 'dark' ? 'Dark' : 'Light'}`]
          }`}
        />
        <Typography variant="h1" className={styles.title}>
          {title}
        </Typography>
        <Box className={styles.buttonContainer}>
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

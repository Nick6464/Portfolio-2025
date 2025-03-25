import React from 'react';
import { SvgIconComponent } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

interface SocialIconProps {
  link: string;
  icon: SvgIconComponent;
  label: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ link, icon: Icon, label }) => {
  return (
    <Tooltip title={label}>
      <IconButton
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        <Icon />
      </IconButton>
    </Tooltip>
  );
};

export default SocialIcon;

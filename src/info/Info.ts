import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { SvgIconComponent } from '@mui/icons-material';
import self from '../assets/self.png';
import mock1 from '../assets/mock1.png';
import mock2 from '../assets/mock2.png';
import mock3 from '../assets/mock3.png';
import mock4 from '../assets/mock4.png';
import nzbrLogo from '../assets/nzbr-logo.png';

export const colors = ['rgb(0,255,164)', 'rgb(166,104,255)'];

export interface Info {
  firstName: string;
  lastName: string;
  initials: string;
  position: string;
  selfPortrait: string;
  gradient: string;
  miniBio: Array<{
    emoji: string;
    text: string;
  }>;
  socials: Array<{
    link: string;
    icon: SvgIconComponent;
    label: string;
  }>;
  bio: string;
  skills: {
    proficientWith: string[];
    exposedTo: string[];
  };
  hobbies: Array<{
    label: string;
    emoji: string;
  }>;
  portfolio: Array<{
    title: string;
    live?: string;
    source?: string;
    image?: string;
    icon?: SvgIconComponent;
    description?: string;
  }>;
}

export const info: Info = {
  firstName: 'Nick',
  lastName: 'Walton',
  initials: 'NW',
  position: 'a Senior Full Stack Engineer',
  selfPortrait: self,
  gradient: `-webkit-linear-gradient(135deg, ${colors})`,
  miniBio: [
    {
      emoji: '🌎',
      text: 'Based in the Wellington, NZ',
    },
    {
      emoji: '💼',
      text: 'Senior Fullstack Engineer',
    },
    {
      emoji: '📧',
      text: 'nick@waltonit.dev',
    },
  ],
  socials: [
    {
      link: 'https://github.com/Nick6464',
      icon: GitHubIcon,
      label: 'github',
    },
    {
      link: 'https://www.linkedin.com/in/nick-walton-1a474b173/',
      icon: LinkedInIcon,
      label: 'linkedin',
    },
    {
      link: 'mailto:nick@waltonit.dev',
      icon: EmailIcon,
      label: 'email',
    },
  ],
  bio: "Hello! I'm Nick. I'm a Senior Fullstack Engineer. I've been using code to improve my life and the lives of others since I was 11. I'm passionate about using code to solve problems and make life easier. I'm a big fan of React and Node.js, and I'm always looking to learn new things.",
  skills: {
    proficientWith: [
      'react.js',
      'node.js',
      'aws',
      'cdktf',
      'javascript',
      'java',
      'git',
      'sql',
      'nosql',
      'azure',
      'python',
    ],
    exposedTo: ['c#', 'c++', 'c', 'php', 'docker', 'kubernetes'],
  },
  hobbies: [
    {
      label: 'plants and tissue culture',
      emoji: '🪴',
    },
    {
      label: 'ctf competitions',
      emoji: '🛡️',
    },
    {
      label: 'dungeons and dragons',
      emoji: '🐉',
    },
    {
      label: '3d printing',
      emoji: '🖨️',
    },
    {
      label: 'gaming',
      emoji: '🎮',
    },
    {
      label: 'surfing',
      emoji: '🏄',
    },
  ],
  portfolio: [
    {
      title: 'NZ Boat Register',
      live: 'https://nzboatregister.co.nz',
      image: nzbrLogo,
      description:
        'A comprehensive boat registration system for New Zealand waters, leveraging NFC ID Tags',
    },
    {
      title: 'Orchid Shelf - Flood Irrigation System',
      source: 'https://github.com/Nick6464/OrchidShelf',
      icon: LocalFloristIcon,
      description:
        'A Home Assistant-controlled flood irrigation system designed for orchids and other plants using ESP32, ESPHome, and reversible pumps for automated flood-and-drain cycles.',
    },
    {
      title: 'Procedual Generation of Flying Islands',
      source: 'https://www.github.com/Nick6464/FlyingIslands',
      image: mock4,
      description:
        'A procedural generation algorithm for creating unique floating island landscapes using OpenSimplex Noise',
    },
    {
      title: 'Portfolio',
      live: 'https://www.waltonit.dev',
      source: 'https://github.com/Nick6464/Portfolio-2025',
      image: mock3,
      description:
        'A modern, responsive portfolio website showcasing my projects and skills.',
    },
    {
      title: 'GaragePi',
      source: 'https://github.com/Nick6464/garagepi-frontend',
      image: mock1,
      description:
        'A smart garage door control system using Raspberry Pi Pico, React and AWS Core IoT.',
    },

    {
      title: 'Minecraft Hardcore Tracker',
      source: 'https://github.com/Nick6464/Nicks-Hardcore',
      image: mock2,
      description:
        'A tool for tracking and managing Minecraft hardcore world statistics.',
    },
  ],
};

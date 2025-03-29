import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import styles from './Navbar.module.scss';
import Toggler from './home/Toggler';
import { info } from '../info/Info';
import logo from '../assets/logo.png';

interface NavbarProps {
  darkMode: boolean;
  handleClick: () => void;
}

const links = [
  {
    name: 'home',
    to: '/',
    active: 'Home',
  },
  {
    name: 'about me',
    to: '/about',
    active: 'About',
  },
  {
    name: logo,
    type: 'logo',
    to: '/',
    active: 'Home',
  },
  {
    name: 'portfolio',
    to: '/portfolio',
    active: 'Portfolio',
  },
];

const Navbar: React.FC<NavbarProps> = ({ darkMode, handleClick }) => {
  const location = useLocation();
  const [active, setActive] = useState(
    location.pathname === '/'
      ? 'home'
      : location.pathname.slice(1, location.pathname.length)
  );

  return (
    <Box
      component={'nav'}
      width={'100%'}
      sx={{
        backgroundColor: 'transparent',
      }}
    >
      <Container maxWidth="lg">
        <Box
          component={'ul'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={{ xs: '1.5rem', sm: '2rem' }}
          textTransform={'lowercase'}
          fontSize={'1rem'}
          py={2}
          sx={{
            '& > li': {
              display: 'flex',
              alignItems: 'center',
            },
          }}
        >
          {links.map((link, index) => {
            if (link.type && window.innerWidth <= 400) return null;
            return (
              <Box
                key={index}
                component={'li'}
                className={
                  link.active === active && !link.type ? styles.active : ''
                }
                sx={{
                  borderImageSource: info.gradient,
                  ...(link.type && {
                    height: { xs: 40, sm: 50, md: 60 },
                    width: { xs: 40, sm: 50, md: 60 },
                    margin: '0 1rem',
                  }),
                }}
              >
                <Link
                  to={link.to}
                  onClick={() => setActive(link.active)}
                  className={styles.link}
                  style={{ color: darkMode ? 'white' : 'black' }}
                >
                  {!link.type && (
                    <span style={{ padding: '0.5rem 0' }}>{link.name}</span>
                  )}
                  {link.type && (
                    <img
                      style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'contain',
                      }}
                      src={link.name}
                      alt={'logo'}
                    />
                  )}
                </Link>
              </Box>
            );
          })}
          <li>
            <Toggler darkMode={darkMode} handleClick={handleClick} />
          </li>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;

import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';
import Portfolio from './portfolio/Portfolio';
import styles from './BaseLayout.module.scss';
import Navbar from './Navbar';
import { Box, Grid2, ThemeProvider } from '@mui/material';
import ThreeBackground from './ThreeBackground';
import { lightTheme, darkTheme } from '../theme';

const BaseLayout: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const handleToggleDarkMode = () => {
    const oppositeOfCurrentDarkMode = !darkMode;
    localStorage.setItem('darkMode', `${oppositeOfCurrentDarkMode}`);
    setDarkMode(oppositeOfCurrentDarkMode);
    document.documentElement.setAttribute(
      'data-theme',
      oppositeOfCurrentDarkMode ? 'dark' : 'light'
    );
  };

  useEffect(() => {
    const detectedDarkMode = JSON.parse(
      localStorage.getItem('darkMode') || 'true'
    );
    setDarkMode(detectedDarkMode);
    document.documentElement.setAttribute(
      'data-theme',
      detectedDarkMode ? 'dark' : 'light'
    );
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Box className={darkMode ? styles.dark : styles.light}>
        <Grid2
          container
          display={'flex'}
          flexDirection={'column'}
          minHeight={'100vh'}
          justifyContent={'space-between'}
          style={{ position: 'relative', zIndex: 2 }}
        >
          <Grid2>
            <Navbar darkMode={darkMode} handleClick={handleToggleDarkMode} />
          </Grid2>
          <Grid2 flexGrow={1}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
          </Grid2>
        </Grid2>
        <ThreeBackground darkMode={darkMode} />
      </Box>
    </ThemeProvider>
  );
};

export default BaseLayout;

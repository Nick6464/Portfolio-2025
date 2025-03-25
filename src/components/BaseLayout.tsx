import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';
import Portfolio from './portfolio/Portfolio';
import styles from './BaseLayout.module.scss';
import Navbar from './Navbar';
import { Box, Grid2 } from '@mui/material';
import ThreeBackground from './ThreeBackground';

const BaseLayout: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const handleToggleDarkMode = () => {
    const oppositeOfCurrentDarkMode = !darkMode;
    localStorage.setItem('darkMode', `${oppositeOfCurrentDarkMode}`);
    setDarkMode(oppositeOfCurrentDarkMode);
  };

  useEffect(() => {
    const detectedDarkMode = JSON.parse(
      localStorage.getItem('darkMode') || 'true'
    );
    setDarkMode(detectedDarkMode);
  }, []);

  return (
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
  );
};

export default BaseLayout;

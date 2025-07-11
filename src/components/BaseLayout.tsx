import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';
import Portfolio from './portfolio/Portfolio';
import MossPoleCalculator from './moss-pole-calculator/MossPoleCalculator';
import SupplierNotebook from './moss-pole-calculator/SupplierNotebook';
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
              {/*  */}
              {/* Well well well, if it isn't someone having a snoop? */}
              {/* This I make moss poles and this was a little tool I made to help me calculate the costs */}
              {/* It's not private, but it's not something I'm wanting to share with the world */}
              {/* I'm not sure if I'll keep it up to date, but it's here for now */}
              {/*  */}
              <Route
                path="/f47ac10b-58cc-4372-a567-0e02b2c3d479/mossPoleCalculator"
                element={<MossPoleCalculator />}
              />
              <Route
                path="/a1b2c3d4-5e6f-7890-abcd-ef1234567890/supplierNotebook"
                element={<SupplierNotebook />}
              />
            </Routes>
          </Grid2>
        </Grid2>
        <ThreeBackground darkMode={darkMode} />
      </Box>
    </ThemeProvider>
  );
};

export default BaseLayout;

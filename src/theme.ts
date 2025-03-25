import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
    common: {
      white: '#ffffff',
      black: '#000000',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#f5f5f5',
          border: '1px solid rgba(0,0,0,0.08)',
          minWidth: '140px',
          boxShadow: 'none',
          color: '#424242',
          fontFamily: 'Courier New, Courier, monospace',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: '#eeeeee',
            boxShadow: 'none',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#27242f',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
    common: {
      white: '#ffffff',
      black: '#000000',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#2A2833',
          border: '1px solid rgba(255,255,255,0.1)',
          minWidth: '140px',
          boxShadow: 'none',
          color: '#fff',
          fontFamily: 'Courier New, Courier, monospace',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: '#3A3843',
            boxShadow: 'none',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
  },
});

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
  },
});

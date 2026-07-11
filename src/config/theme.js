import { createTheme } from '@mui/material/styles';

export const getCustomTheme = (mode) => 
  createTheme({
    palette: {
      mode: mode ? 'dark' : 'light',
      primary: {
        main: '#D4AF37', //--------- Premium Bistro Gold / Amber accent color
      },
      secondary: {
        main: '#121212',
      },
      background: {
        default: mode ? '#121212' : '#FAF9F6', //--------- Obsidian black vs Cream White
        paper: mode ? '#1E1E1E' : '#FFFFFF',   //--------- Card & Dropdown background depths
      },
      text: {
        primary: mode ? '#FFFFFF' : '#1C1A17',
        secondary: mode ? '#A0A0A0' : '#555450',
      },
    },
    typography: {
      fontFamily: '"Playfair Display", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h6: {
        fontWeight: 600,
        letterSpacing: '0.05em',
      },
    },
    shape: {
      borderRadius: 12, //------------ Gives all cards and buttons a smooth, modern rounded look
    },
  });
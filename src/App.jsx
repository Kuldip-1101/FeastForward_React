import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { getCustomTheme } from '../src/config/theme';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HoursSection from './components/HoursSection';
import Home from './pages/Home';

function App() {
  //------------- Read our theme state -------------
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  
  // -------------- Generate the active configuration object------------
  const theme = getCustomTheme(isDarkMode);

  return (
    <ThemeProvider theme={theme}>
      {/*----------- resets default browser margins and applies baseline background styling ------------*/}
      <CssBaseline /> 
      
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/*----------- Our modern responsive header navigation ------------*/}
        <Navbar />
        
        {/*---------------- Main viewing area ----------------*/}
        <Home />
      </Box>
    </ThemeProvider>
  );
}

export default App;
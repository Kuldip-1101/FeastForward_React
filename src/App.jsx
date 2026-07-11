import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { getCustomTheme } from '../src/config/theme';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

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
        <Box component="main" sx={{ flexGrow: 1 }}>
          <HeroSection />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
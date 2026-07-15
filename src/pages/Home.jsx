import { Box } from '@mui/material';
import HeroSection from '../components/HeroSection';
import HoursSection from '../components/HoursSection';

function Home() {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <HeroSection />
      <HoursSection />
    </Box>
  );
}

export default Home;
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/*---------- Fixed Navbar on top ----------*/}
      <Navbar />
      
      {/*---------- Main Content Area ----------*/}
      <Outlet />
    </Box>
  );
}

export default Layout;
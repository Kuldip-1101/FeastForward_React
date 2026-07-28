import { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import AuthModal from '../components/AuthModal';

function Layout() {

  const [authOpen, setAuthOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleOpenAuth = () => setAuthOpen(true);
  const handleCloseAuth = () => setAuthOpen(false);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/*----------- Customer Navbar ------------*/}
     <Navbar onOpenAuth={handleOpenAuth} />
      
      {/*---------- Main Content Area ----------*/}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet context={{ user, isAuthenticated, onOpenAuthModal: handleOpenAuth }} />
      </Box>

      {/*-------- Global Auth Modal mounted at top level ------------*/}
      <AuthModal open={authOpen} handleClose={handleCloseAuth} />

    </Box>
  );
}

export default Layout;
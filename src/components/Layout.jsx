import { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import AuthModal from './AuthModal';

function Layout() {

  const [authOpen, setAuthOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleOpenAuth = () => setAuthOpen(true);
  const handleCloseAuth = () => setAuthOpen(false);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/*---------- Fixed Navbar on top ----------*/}
      <Navbar onOpenAuth={handleOpenAuth} />
      
      {/*---------- Main Content Area ----------*/}
      <Outlet context={{ user, isAuthenticated, onOpenAuthModal: handleOpenAuth }} />

      {/*-------- Global Auth Modal mounted at top level ------------*/}
      <AuthModal open={authOpen} handleClose={handleCloseAuth} />

    </Box>
  );
}

export default Layout;
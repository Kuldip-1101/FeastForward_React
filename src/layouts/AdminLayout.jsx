import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AdminSidebar, { DRAWER_WIDTH } from '../components/admin/AdminSidebar';
import HeaderUtilities from '../components/navbar/HeaderUtilities';

function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* ---------- Top Sticky Bar ---------- */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ justifyContent: isMobile ? 'space-between' : 'flex-end', px: 3 }}>
          {/*--------------- Mobile Drawer Hamburger Toggle ---------------*/}
          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 1 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" fontWeight="bold">
                Admin Portal
              </Typography>
            </Box>
          )}

          {/*------- Shared Utility Component (Language Selector + Theme Toggle) -----------*/}
          <HeaderUtilities />
        </Toolbar>
      </AppBar>

      {/* ---------- Admin Sidebar Component ---------- */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />

      {/* ---------- Main Content View ---------- */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: 8, //------- Offset content below sticky bar
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;
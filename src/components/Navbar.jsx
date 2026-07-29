import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Stack,
  Button,
  Badge,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";

import { logout } from "../store/authSlice";
import CartDrawer from "./CartDrawer";
import MobileDrawer from "./MobileDrawer";
import HeaderUtilities from "./HeaderUtilities"; // Integrated extracted component
import { useCurrentCart } from "../hooks/useCurrentCart";
import { NAV_LINKS } from "../constants/navigation"; 

//-------------MUI Premium Icon imports---------
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar({ onOpenAuth }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down(1100));
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { totalCartCount } = useCurrentCart();

  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
          backdropFilter: "blur(8px)",
          color: "text.primary",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1.5, sm: 3 } }}>
          {/*------------ Brand / Hamburger------------ */}
          <Stack direction="row" alignitems="center" spacing={1}>
            {isMobile ? (
              <IconButton onClick={() => setMobileMenuOpen(true)} color="inherit" edge="start">
                <MenuIcon />
              </IconButton>
            ) : (
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  textDecoration: "none",
                }}
              >
                FeastForward
              </Typography>
            )}
          </Stack>

          {/*--------- Desktop Links Loop ----------*/}
          {!isMobile && (
            <Stack direction="row" spacing={1}>
              {NAV_LINKS.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Button
                    key={link.path}
                    component={NavLink}
                    to={link.path}
                    color="inherit"
                    startIcon={<IconComponent fontSize="small" />}
                    sx={{
                      fontWeight: 600,
                      px: 2,
                      borderRadius: 2,
                      "&.active": {
                        color: "primary.main",
                        backgroundColor: "action.selected",
                      },
                    }}
                  >
                    {t(link.translationKey) || link.fallbackLabel}
                  </Button>
                );
              })}
            </Stack>
          )}

          {/*----------------- Actions ------------------ */}
          <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignitems="center">
            <IconButton color="inherit" onClick={() => setCartOpen(true)} size="small">
              <Badge badgeContent={totalCartCount} color="primary">
                <ShoppingBagIcon fontSize="small" />
              </Badge>
            </IconButton>

            {!isMobile && (
              isAuthenticated ? (
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <Typography variant="body2" sx={{ fontWeight: "600" }}>
                    {t("welcomeUser", { name: user?.name })}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<LogoutIcon />}
                    onClick={() => dispatch(logout())}
                    sx={{ fontWeight: "600", borderRadius: 2 }}
                  >
                    {t("logout")}
                  </Button>
                </Stack>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<LoginIcon />}
                  onClick={onOpenAuth}
                  sx={{ fontWeight: "600", borderRadius: 2 }}
                >
                  {t("login")}
                </Button>
              )
            )}

            {isMobile && !isAuthenticated && (
              <IconButton color="primary" onClick={onOpenAuth} size="small">
                <LoginIcon fontSize="small" />
              </IconButton>
            )}

            {/*---------------- Reusable Header Utilities ------------------*/}
            <HeaderUtilities />
          </Stack>
        </Toolbar>
      </AppBar>

      <MobileDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={() => dispatch(logout())}
        onOpenAuth={onOpenAuth}
      />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default Navbar;
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Select,
  MenuItem,
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
import { toggleTheme } from "../store/themeSlice";
import { setLanguage } from "../store/localeSlice";
import { logout } from "../store/authSlice";
import i18n from "../config/i18n";
import AuthModal from "./AuthModal";
import CartDrawer from "./CartDrawer";
import MobileDrawer from "./MobileDrawer";
import { useCurrentCart } from "../hooks/useCurrentCart"; // Hook imported here

//---------------MUI Premium Icons ----------------
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LanguageIcon from "@mui/icons-material/Language";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const currentLang = useSelector((state) => state.locale.currentLang);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  //----------- Hook handles active user / guest cart automatically---------
  const { totalCartCount } = useCurrentCart();

  //----------------- Local State for Modals -----------------
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //-------- Auto-close mobile drawer when screen grows above 900px-------
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    dispatch(setLanguage(selectedLang));
    i18n.changeLanguage(selectedLang);
  };

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
          {/* -----------Left: Mobile Hamburger OR Desktop Brand -----------*/}
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

          {/*------------- Center: Desktop Navigation Links ------------*/}
          {!isMobile && (
            <Stack direction="row" spacing={1}>
              <Button
                component={NavLink}
                to="/"
                color="inherit"
                sx={{
                  fontWeight: 600,
                  px: 2,
                  borderRadius: 2,
                  "&.active": { color: "primary.main", backgroundColor: "action.selected" },
                }}
              >
                {t("navHome")}
              </Button>

              <Button
                component={NavLink}
                to="/menu"
                color="inherit"
                startIcon={<RestaurantMenuIcon fontSize="small" />}
                sx={{
                  fontWeight: 600,
                  px: 2,
                  borderRadius: 2,
                  "&.active": { color: "primary.main", backgroundColor: "action.selected" },
                }}
              >
                {t("navMenu")}
              </Button>
            </Stack>
          )}

          {/*------------- Right: Actions Cluster --------------*/}
          <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignitems="center">
            {/* Language Selector */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LanguageIcon color="action" fontSize="small" />
              <Select
                value={currentLang}
                onChange={handleLanguageChange}
                variant="standard"
                disableUnderline
                sx={{ fontWeight: 500, fontSize: "0.85rem", color: "text.primary" }}
              >
                <MenuItem value="en">EN</MenuItem>
                <MenuItem value="gu">GU</MenuItem>
                <MenuItem value="hi">HI</MenuItem>
                <MenuItem value="pa">PA</MenuItem>
                <MenuItem value="fr">FR</MenuItem>
                <MenuItem value="es">ES</MenuItem>
              </Select>
            </Box>

            {/*-------------------- Cart Icon -----------------*/}
            <IconButton color="inherit" onClick={() => setCartOpen(true)} size="small">
              <Badge badgeContent={totalCartCount} color="primary">
                <ShoppingBagIcon fontSize="small" />
              </Badge>
            </IconButton>

            {/*---------------- Desktop Auth Section ---------------*/}
            {!isMobile && (
              isAuthenticated ? (
                <Stack direction="row" spacing={1.5} sx ={{ alignItems: "center" }}>
                  <Typography variant="body2" sx={{ fontWeight: "600" }}>
                    {t("welcomeUser", { name: user.name })}
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
                  onClick={() => setAuthOpen(true)}
                  sx={{ fontWeight: "600", borderRadius: 2 }}
                >
                  {t("login")}
                </Button>
              )
            )}

            {/*---------------- Mobile-only Quick Login button when logged out ----------------*/}
            {isMobile && !isAuthenticated && (
              <IconButton color="primary" onClick={() => setAuthOpen(true)} size="small">
                <LoginIcon fontSize="small" />
              </IconButton>
            )}

            {/*-------------------- Theme Toggle -----------------*/}
            <IconButton onClick={() => dispatch(toggleTheme())} color="inherit" size="small">
              {isDarkMode ? <LightModeIcon sx={{ color: "primary.main" }} fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/*------------- Mobile Navigation Drawer ----------------*/}
      <MobileDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={() => dispatch(logout())}
        onOpenAuth={() => setAuthOpen(true)}
      />

      {/*------------- Global Modals -------------*/}
      <AuthModal open={authOpen} handleClose={() => setAuthOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default Navbar;
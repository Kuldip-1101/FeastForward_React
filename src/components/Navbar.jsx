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
import { useCurrentCart } from "../hooks/useCurrentCart";
import { NAV_LINKS } from "../config/navigation"; 

//-------------MUI Premium Icon imports---------
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LanguageIcon from "@mui/icons-material/Language";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar({ onOpenAuth }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down(1100));

  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const currentLang = useSelector((state) => state.locale.currentLang);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const { totalCartCount } = useCurrentCart();

  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

          {/*----------------- Actions------------------ */}
          <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignitems="center">
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

            <IconButton color="inherit" onClick={() => setCartOpen(true)} size="small">
              <Badge badgeContent={totalCartCount} color="primary">
                <ShoppingBagIcon fontSize="small" />
              </Badge>
            </IconButton>

            {!isMobile && (
              isAuthenticated ? (
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
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

            <IconButton onClick={() => dispatch(toggleTheme())} color="inherit" size="small">
              {isDarkMode ? (
                <LightModeIcon sx={{ color: "primary.main" }} fontSize="small" />
              ) : (
                <DarkModeIcon fontSize="small" />
              )}
            </IconButton>
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
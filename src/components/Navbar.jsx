import { useState } from "react";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, NavLink} from "react-router-dom";
import { toggleTheme } from "../store/themeSlice";
import { setLanguage } from "../store/localeSlice";
import { logout } from "../store/authSlice";
import i18n from "../config/i18n";
import AuthModal from "./AuthModal";

//-------------- MUI Premium Icons-------------
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LanguageIcon from "@mui/icons-material/Language";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

function Navbar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const currentLang = useSelector((state) => state.locale.currentLang);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [authOpen, setAuthOpen] = useState(false);

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
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/*----------- Brand Premium Logo Typography --------------*/}
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            FeastForward
          </Typography>

          {/*----------- Central Navigation Links Area --------------*/}
          <Stack direction="row" spacing={1}>
            <Button
              component={NavLink}
              to="/"
              color="inherit"
              sx={{
                fontWeight: 600,
                fontSize: "0.9rem",
                px: 2,
                borderRadius: 2,
                "&.active": {
                  color: "primary.main",
                  backgroundColor: "action.selected",
                },
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
                fontSize: "0.9rem",
                px: 2,
                borderRadius: 2,
                "&.active": {
                  color: "primary.main",
                  backgroundColor: "action.selected",
                },
              }}
            >
              {t("navMenu")}
            </Button>
          </Stack>

          {/*----------- Global Controls Stack --------------*/}
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            {/* Custom Language Selector Wrapper */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LanguageIcon color="action" fontSize="small" />
              <Select
                value={currentLang}
                onChange={handleLanguageChange}
                variant="standard"
                disableUnderline
                sx={{
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  color: "text.primary",
                  cursor: "pointer",
                }}
                //----------- makes sure matches our dark/light theme perfectly-------------
                MenuProps={{
                  paperprops: {
                    sx: { bgcolor: "background.paper" },
                  },
                }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="gu">ગુજરાતી</MenuItem>
                <MenuItem value="hi">हिन्दी</MenuItem>
                <MenuItem value="pa">ਪੰਜਾਬੀ</MenuItem>
                <MenuItem value="fr">Français</MenuItem>
                <MenuItem value="es">Español</MenuItem>
              </Select>
            </Box>

            {/*----------- Conditional Authentication Rendering Stack ------------------*/}
            {isAuthenticated ? (
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "600", color: "text.primary" }}
                >
                  {t("welcomeUser", { name: user.name })}
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<LogoutIcon />}
                  onClick={() => dispatch(logout())}
                  sx={{ fontWeight: "600" }}
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
            )}

            {/*----------- Eye-catching Light/Dark Toggle Icon Button --------------*/}
            <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
              {isDarkMode ? (
                <LightModeIcon sx={{ color: "primary.main" }} />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <AuthModal open={authOpen} handleClose={() => setAuthOpen(false)} />
    </>
  );
}

export default Navbar;

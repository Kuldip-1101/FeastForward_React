import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Select,
  MenuItem,
  IconButton,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toggleTheme } from "../store/themeSlice";
import { setLanguage } from "../store/localeSlice";
import i18n from "../config/i18n"; // Import the i18n configuration

//-------------- MUI Premium Icons-------------
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LanguageIcon from "@mui/icons-material/Language";

function Navbar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const currentLang = useSelector((state) => state.locale.currentLang);

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    dispatch(setLanguage(selectedLang));
    i18n.changeLanguage(selectedLang);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        backdropFilter: "blur(8px)", // Trendy blur effect
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
                PaperProps: {
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
  );
}

export default Navbar;

import React from 'react';
import { Box, Select, MenuItem, IconButton, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/themeSlice';
import { setLanguage } from '../../store/localeSlice';
import i18n from '../../config/i18n';

//------------- MUI Premium Icons ----------
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LanguageIcon from '@mui/icons-material/Language';

function HeaderUtilities() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const currentLang = useSelector((state) => state.locale.currentLang);

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    dispatch(setLanguage(selectedLang));
    i18n.changeLanguage(selectedLang);
  };

  return (
    <Stack direction="row" spacing={1} alignitems="center">
      {/*------------- Language Selector ----------------*/}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <LanguageIcon color="action" fontSize="small" />
        <Select
          value={currentLang}
          onChange={handleLanguageChange}
          variant="standard"
          disableUnderline
          sx={{ fontWeight: 500, fontSize: '0.85rem', color: 'text.primary' }}
        >
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="gu">GU</MenuItem>
          <MenuItem value="hi">HI</MenuItem>
          <MenuItem value="pa">PA</MenuItem>
          <MenuItem value="fr">FR</MenuItem>
          <MenuItem value="es">ES</MenuItem>
        </Select>
      </Box>

      {/*------------------- Dark / Light Mode Toggle ---------------*/}
      <IconButton onClick={() => dispatch(toggleTheme())} color="inherit" size="small">
        {isDarkMode ? (
          <LightModeIcon sx={{ color: 'primary.main' }} fontSize="small" />
        ) : (
          <DarkModeIcon fontSize="small" />
        )}
      </IconButton>
    </Stack>
  );
}

export default HeaderUtilities;
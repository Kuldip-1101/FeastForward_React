import React from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { PERIOD_FILTERS } from "../../../constants/adminAnalyticsConstant";

export default function AnalyticsHeader({
  periodFilter,
  onPeriodChange,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  theme,
}) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 800, color: primaryText }}>
          {t("admin.analyticsTab.title")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("admin.analyticsTab.subtitle")}
        </Typography>
      </Box>

      {/*--------------------- Desktop Toggle Group ---------------------*/}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <ToggleButtonGroup
          value={periodFilter}
          exclusive
          onChange={(_, val) => val && onPeriodChange(val)}
          size="small"
          sx={{
            backgroundColor: cardBg,
            "& .MuiToggleButton-root": {
              color: secondaryText,
              border: `1px solid ${borderColor}`,
              "&.Mui-selected": {
                color: theme.palette.getContrastText("#E5A93C"),
                backgroundColor: "#E5A93C",
                fontWeight: 700,
                "&:hover": { backgroundColor: "#d4982b" },
              },
            },
          }}
        >
          {PERIOD_FILTERS.map((filter) => (
            <ToggleButton key={filter.value} value={filter.value}>
              {t(filter.labelKey)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/*---------------------- Mobile Dropdown Select ------------------------*/}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={periodFilter}
            onChange={(e) => onPeriodChange(e.target.value)}
            MenuProps={{ disableScrollLock: true }}
            sx={{ backgroundColor: cardBg, color: primaryText }}
          >
            {PERIOD_FILTERS.map((filter) => (
              <MenuItem key={filter.value} value={filter.value}>
                {t(filter.labelKey)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
import React from "react";
import {
  Paper,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getStatusOptions, getShiftOptions } from "../../constants/adminReservationTabConstant";

export default function ReservationFilters({
  searchQuery,
  setSearchQuery,
  selectedDate,
  setSelectedDate,
  statusFilter,
  setStatusFilter,
  shiftFilter,
  setShiftFilter,
  t,
}) {
  const statusOptions = getStatusOptions(t);
  const shiftOptions = getShiftOptions(t);

  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 2 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignitems="center"
      >
        <TextField
          fullWidth
          placeholder={t("admin.reservationsTab.filters.searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputprops={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          size="small"
        />

        <TextField
          type="date"
          label={t("admin.reservationsTab.filters.dateLabel")}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          size="small"
          inputlabelprops={{ shrink: true }}
          sx={{ minWidth: 160 }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>{t("admin.reservationsTab.filters.statusLabel")}</InputLabel>
          <Select
            value={statusFilter}
            label={t("admin.reservationsTab.filters.statusLabel")}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>{t("admin.reservationsTab.filters.shiftLabel")}</InputLabel>
          <Select
            value={shiftFilter}
            label={t("admin.reservationsTab.filters.shiftLabel")}
            onChange={(e) => setShiftFilter(e.target.value)}
          >
            {shiftOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
}
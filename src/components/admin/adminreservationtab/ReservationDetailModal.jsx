import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function ReservationDetailModal({
  openModal,
  handleCloseModal,
  handleSubmit,
  handleFormSubmit,
  register,
  control,
  errors,
  createBookingMutation,
  TIME_SLOTS,
  isSlotFullyBooked,
  isLoadingBookings,
  suitableTables,
  bookedTableIdsForSlot,
  modalTimeSlot,
  isLoadingTables,
  t,
}) {
  return (
    <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {t("admin.reservationsTab.dialog.title")}
      </DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/*------------------ Full Name --------------------*/}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label={t("admin.reservationsTab.dialog.fullName")}
                {...register("fullName", {
                  required: t("admin.reservationsTab.dialog.fullNameReq"),
                })}
                error={Boolean(errors.fullName)}
                helperText={errors.fullName?.message}
              />
            </Grid>

            {/*------------------ Email --------------------*/}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label={t("admin.reservationsTab.dialog.email")}
                type="email"
                {...register("email", {
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: t("admin.reservationsTab.dialog.emailInvalid"),
                  },
                })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </Grid>

            {/*------------------ Phone --------------------*/}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label={t("admin.reservationsTab.dialog.phone")}
                {...register("phone", {
                  required: t("admin.reservationsTab.dialog.phoneReq"),
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: t("admin.reservationsTab.dialog.phoneInvalid"),
                  },
                })}
                error={Boolean(errors.phone)}
                helperText={errors.phone?.message}
              />
            </Grid>

            {/*------------------ Guest Count --------------------*/}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="number"
                label={t("admin.reservationsTab.dialog.guestCount")}
                slotProps={{
                  input: {
                    startAdornment: <PeopleIcon color="action" sx={{ mr: 1 }} />,
                  },
                }}
                {...register("guestCount", {
                  required: t("admin.reservationsTab.dialog.guestReq"),
                  min: { value: 1, message: t("admin.reservationsTab.dialog.guestMin") },
                  max: { value: 20, message: t("admin.reservationsTab.dialog.guestMax") },
                })}
                error={Boolean(errors.guestCount)}
                helperText={errors.guestCount?.message}
              />
            </Grid>

            {/*------------------ Date Selection --------------------*/}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label={t("admin.reservationsTab.dialog.resDate")}
                slotProps={{
                  inputLabel: { shrink: true },
                  input: {
                    startAdornment: <CalendarTodayIcon color="action" sx={{ mr: 1 }} />,
                  },
                }}
                {...register("date", { required: t("admin.reservationsTab.dialog.dateReq") })}
                error={Boolean(errors.date)}
                helperText={errors.date?.message}
              />
            </Grid>

            {/*------------------ Time Slot Picker --------------------*/}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="timeSlot"
                control={control}
                rules={{ required: t("admin.reservationsTab.dialog.timeSlotReq") }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label={t("admin.reservationsTab.dialog.timeSlot")}
                    disabled={isLoadingBookings}
                    slotProps={{
                      input: {
                        startAdornment: <AccessTimeIcon color="action" sx={{ mr: 1 }} />,
                      },
                    }}
                    error={Boolean(errors.timeSlot)}
                    helperText={errors.timeSlot?.message}
                  >
                    {TIME_SLOTS.map((slot) => {
                      const disabled = isSlotFullyBooked(slot);
                      return (
                        <MenuItem key={slot} value={slot} disabled={disabled}>
                          <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                            <Typography>{slot}</Typography>
                            {disabled && (
                              <Typography variant="caption" color="error">
                                {t("admin.reservationsTab.dialog.fullyBooked")}
                              </Typography>
                            )}
                          </Box>
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              />
            </Grid>

            {/*------------------ Table Selection --------------------*/}
            <Grid size={{ xs: 12 }}>
              <Controller
                name="tableId"
                control={control}
                rules={{ required: t("admin.reservationsTab.dialog.tableReq") }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label={t("admin.reservationsTab.dialog.selectTable")}
                    disabled={!modalTimeSlot || isLoadingTables}
                    error={Boolean(errors.tableId)}
                    helperText={
                      errors.tableId?.message ||
                      (!modalTimeSlot ? t("admin.reservationsTab.dialog.pickTimeFirst") : "")
                    }
                  >
                    {suitableTables.map((tbl) => {
                      const isBooked = bookedTableIdsForSlot.has(tbl.id);
                      return (
                        <MenuItem key={tbl.id} value={tbl.id} disabled={isBooked}>
                          Table {tbl.number} - {tbl.location} ({tbl.capacity}{" "}
                          {t("admin.reservationsTab.dialog.seats")})
                          {isBooked ? ` - ${t("admin.reservationsTab.dialog.reserved")}` : ""}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              />
            </Grid>

            {/*----------------------- Special Requests -------------------*/}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label={t("admin.reservationsTab.dialog.notes")}
                placeholder={t("admin.reservationsTab.dialog.notesPlaceholder")}
                {...register("specialRequests")}
              />
            </Grid>
          </Grid>
        </DialogContent>

        {/*------------------------- Dialog Actions ------------------------*/}
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleCloseModal} color="inherit">
            {t("admin.reservationsTab.dialog.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={createBookingMutation.isPending}
          >
            {createBookingMutation.isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("admin.reservationsTab.dialog.confirm")
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
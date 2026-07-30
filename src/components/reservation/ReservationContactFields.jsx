import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Grid, TextField, MenuItem, Box, Typography } from "@mui/material";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";

const TIME_SLOTS = [
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
];

export function ReservationContactFields({
  register,
  control,
  errors,
  selectedTimeSlot,
  isLoadingBookings,
  isLoadingTables,
  suitableTables,
  bookedTableIdsForSlot,
  isSlotFullyBooked,
}) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={3}>
      {/*-------------------- Full Name --------------------*/}
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label={t("reservation.fullNameLabel")}
          {...register("fullName", {
            required: t("reservation.fullNameRequired"),
          })}
          error={Boolean(errors.fullName)}
          helperText={errors.fullName?.message}
        />
      </Grid>

      {/*-------------------- Email -----------------------*/}
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label={t("reservation.emailLabel")}
          type="email"
          {...register("email", {
            required: t("reservation.emailRequired"),
            pattern: {
              value: /^\S+@\S+$/i,
              message: t("reservation.invalidEmail"),
            },
          })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
      </Grid>

      {/*-------------------- Phone Number -----------------*/}
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label={t("reservation.phoneLabel")}
          {...register("phone", {
            required: t("reservation.phoneRequired"),
            pattern: {
              value: /^[0-9]{10}$/,
              message: t("reservation.phoneInvalid"),
            },
          })}
          error={Boolean(errors.phone)}
          helperText={errors.phone?.message}
        />
      </Grid>

      {/*--------------------- Guest Count ------------------*/}
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          type="number"
          label={t("reservation.guestCountLabel")}
          slotProps={{
            input: {
              startAdornment: <PeopleIcon color="action" sx={{ mr: 1 }} />,
            },
          }}
          {...register("guestCount", {
            required: t("reservation.guestCountLabel"),
            min: { value: 1, message: t("reservation.guestCountMin") },
            max: { value: 20, message: t("reservation.guestCountMax") },
          })}
          error={Boolean(errors.guestCount)}
          helperText={errors.guestCount?.message}
        />
      </Grid>

      {/*--------------------- Date Selection ----------------*/}
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          type="date"
          label={t("reservation.dateLabel")}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              startAdornment: <CalendarTodayIcon color="action" sx={{ mr: 1 }} />,
            },
          }}
          {...register("date", {
            required: t("reservation.dateRequired"),
          })}
          error={Boolean(errors.date)}
          helperText={errors.date?.message}
        />
      </Grid>

      {/*-------------------- Time Slot Picker ---------------*/}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name="timeSlot"
          control={control}
          rules={{ required: t("reservation.timeSlotRequired") }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              label={t("reservation.timeSlotLabel")}
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
                          ({t("reservation.fullyBooked")})
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

      {/*--------------------- Table Selection ---------------*/}
      <Grid size={{ xs: 12 }}>
        <Controller
          name="tableId"
          control={control}
          rules={{ required: t("reservation.tableRequired") }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              label={t("reservation.tableLabel")}
              disabled={!selectedTimeSlot || isLoadingTables}
              error={Boolean(errors.tableId)}
              helperText={
                errors.tableId?.message ||
                (!selectedTimeSlot ? t("reservation.pickTimeFirst") : "")
              }
            >
              {suitableTables.map((tbl) => {
                const isBooked = bookedTableIdsForSlot.has(tbl.id);
                return (
                  <MenuItem key={tbl.id} value={tbl.id} disabled={isBooked}>
                    Table {tbl.number} - {tbl.location} (
                    {t("reservation.seatsUpTo", { count: tbl.capacity })})
                    {isBooked ? ` - [${t("reservation.tableReserved")}]` : ""}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        />
      </Grid>

      {/*--------------------- Special Requests --------------*/}
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          multiline
          rows={2}
          label={t("reservation.specialRequestsLabel")}
          placeholder={t("reservation.specialRequestsPlaceholder")}
          {...register("specialRequests")}
        />
      </Grid>
    </Grid>
  );
}
import { useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";

import { useCurrentCart } from "../hooks/useCurrentCart";
import {
  formatLocalizedPrice,
  formatTotalCartPrice,
} from "../utils/formatCurrency";

const TIME_SLOTS = [
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
];

export function ReservationPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const queryClient = useQueryClient();

  const user = useSelector((state) => state.auth?.user);
  const { cartItems, totalCartAmount, resetCart } = useCurrentCart();

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const todayStr = new Date().toISOString().split("T")[0];

  //--------------- Setup react-hook-form------------
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.name || "",
      email: user?.email || "",
      phone: "",
      date: todayStr,
      timeSlot: "",
      tableId: "",
      guestCount: 2,
      specialRequests: "",
    },
  });

  const selectedDate = watch("date");
  const selectedTimeSlot = watch("timeSlot");
  const selectedGuestCount = Number(watch("guestCount") || 2);

  //---------------Fetch All Tables from db.json-------------
  const { data: allTables = [], isLoading: isLoadingTables } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/tables");
      if (!res.ok) throw new Error("Failed to fetch tables list");
      return res.json();
    },
  });

  //---------------Live Availability Fetching (Existing Bookings for Selected Date)---------------
  const { data: existingBookings = [], isLoading: isLoadingBookings } =
    useQuery({
      queryKey: ["bookings", selectedDate],
      queryFn: async () => {
        if (!selectedDate) return [];
        const res = await fetch(
          `http://localhost:5000/bookings?date=${selectedDate}`,
        );
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      },
      enabled: Boolean(selectedDate),
    });

  //----------- Calculate available tables for chosen date, time slot, and guest capacity---------
  const suitableTables = useMemo(() => {
    return allTables.filter((tbl) => tbl.capacity >= selectedGuestCount);
  }, [allTables, selectedGuestCount]);

  //------ Identify which table IDs are already reserved for the selected date + time slot--------
  const bookedTableIdsForSlot = useMemo(() => {
    if (!selectedTimeSlot) return new Set();
    const booked = existingBookings
      .filter((b) => b.timeSlot === selectedTimeSlot)
      .map((b) => b.tableId);
    return new Set(booked);
  }, [existingBookings, selectedTimeSlot]);

  //---------- Check if a time slot has zero available tables left----------
  const isSlotFullyBooked = (slot) => {
    if (suitableTables.length === 0) return false;
    const bookedForThisSlot = existingBookings.filter(
      (b) => b.timeSlot === slot,
    );
    const bookedTableIds = new Set(bookedForThisSlot.map((b) => b.tableId));
    return suitableTables.every((tbl) => bookedTableIds.has(tbl.id));
  };

  //---------------- Mutation to Submit Reservation Payload----------------
  const createBookingMutation = useMutation({
    mutationFn: async (newBooking) => {
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      });
      if (!response.ok) throw new Error(t("reservation.errorMessage"));
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", selectedDate] });
      resetCart();
      reset();
      setToast({
        open: true,
        message: t("reservation.successMessage"),
        severity: "success",
      });
    },
    onError: (error) => {
      setToast({
        open: true,
        message: error.message || t("reservation.errorMessage"),
        severity: "error",
      });
    },
  });

  //------------------ Form Submission Handler -----------------
  const onSubmit = (formData) => {
    const selectedTableObj = allTables.find((t) => t.id === formData.tableId);

    const payload = {
      ...formData,
      userId: user?.id || "guest",
      tableDetails: selectedTableObj
        ? `Table ${selectedTableObj.number} (${selectedTableObj.location})`
        : "",
      createdAt: new Date().toISOString(),
      //-------------- Pre-Ordered Dishes---------------
      preOrders: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPreOrderAmount: totalCartAmount,
    };

    createBookingMutation.mutate(payload);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
        <Box sx={{ display: "flex",justifyContent: "center", alignItems: "center", mb: 1, gap: 1.5 }}>
          <TableRestaurantIcon color="primary" sx={{ fontSize: 36 }} />
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            {t("reservation.title")}
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: "center" }}>
          {t("reservation.subtitle")}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/*--------------- Contact Details ------------------*/}

            {/* -----------Full Name--------------- */}
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

            {/* -----------Email--------------- */}
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

            {/* -----------Phone Number--------------- */}
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

            {/* -----------Number of Guests--------------- */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="number"
                label={t("reservation.guestCountLabel")}
                slotProps={{
                  input: {
                    startAdornment: (
                      <PeopleIcon color="action" sx={{ mr: 1 }} />
                    ),
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

            {/*-------------------- Date Selection ------------------*/}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label={t("reservation.dateLabel")}
                slotProps={{
                  inputLabel: { shrink: true },
                  input: {
                    startAdornment: (
                      <CalendarTodayIcon color="action" sx={{ mr: 1 }} />
                    ),
                  },
                }}
                {...register("date", {
                  required: t("reservation.dateRequired"),
                })}
                error={Boolean(errors.date)}
                helperText={errors.date?.message}
              />
            </Grid>

            {/*-------------------- Time Slot Picker ------------------*/}
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
                        startAdornment: (
                          <AccessTimeIcon color="action" sx={{ mr: 1 }} />
                        ),
                      },
                    }}
                    error={Boolean(errors.timeSlot)}
                    helperText={errors.timeSlot?.message}
                  >
                    {TIME_SLOTS.map((slot) => {
                      const disabled = isSlotFullyBooked(slot);
                      return (
                        <MenuItem key={slot} value={slot} disabled={disabled}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
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

            {/*-------------------- Dynamic Table Selection ------------------*/}
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
                        <MenuItem
                          key={tbl.id}
                          value={tbl.id}
                          disabled={isBooked}
                        >
                          Table {tbl.number} - {tbl.location} (
                          {t("reservation.seatsUpTo", { count: tbl.capacity })})
                          {isBooked
                            ? ` - [${t("reservation.tableReserved")}]`
                            : ""}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              />
            </Grid>

            {/*-------------------- Special Requests ------------------*/}
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

          {/*-------------------- Pre-Ordered Food Section ------------------*/}
          <Divider sx={{ my: 4 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              {t("reservation.preOrderSummaryTitle")}
            </Typography>

            {cartItems.length === 0 ? (
              <Alert severity="info" sx={{ borderRadius: 2 }}>
                {t("reservation.noPreOrders")}
              </Alert>
            ) : (
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <List disablePadding>
                  {cartItems.map((item) => {
                    const title =
                      typeof item.name === "string"
                        ? item.name
                        : item.name?.[currentLang] || item.name?.en || "Item";

                    return (
                      <ListItem key={item.id} sx={{ px: 0, py: 0.5 }}>
                        <ListItemText primary={`${title} × ${item.quantity}`} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {formatLocalizedPrice(
                            item.price,
                            item.quantity,
                            currentLang,
                          )}
                        </Typography>
                      </ListItem>
                    );
                  })}
                </List>
                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {t("reservation.totalAmount")}:
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary.main"
                    sx={{ fontWeight: 800 }}
                  >
                    {formatTotalCartPrice(
                      cartItems,
                      totalCartAmount,
                      currentLang,
                    )}
                  </Typography>
                </Box>
              </Paper>
            )}
          </Box>

          {/*-------------------- Submit Button ------------------*/}
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={createBookingMutation.isPending}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            {createBookingMutation.isPending ? (
              <CircularProgress size={26} color="inherit" />
            ) : (
              t("reservation.confirmButton")
            )}
          </Button>
        </form>
      </Paper>

      {/*----------------- Snackbar positioned top-right with 6s duration --------------*/}
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          severity={toast.severity}
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ReservationPage;

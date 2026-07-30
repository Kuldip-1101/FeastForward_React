import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";

import { useCurrentCart } from "../hooks/useCurrentCart";
import { ReservationContactFields } from "../components/reservation/ReservationContactFields";
import { PreOrderSummarySection } from "../components/reservation/PreOrderSummarySection";

export function ReservationPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const queryClient = useQueryClient();

  const context = useOutletContext();
  const onOpenAuthModal = context?.onOpenAuthModal;
  const isAuthenticatedFromContext = context?.isAuthenticated;

  const { user, isAuthenticated: reduxIsAuth } = useSelector(
    (state) => state.auth || {},
  );
  const isAuthenticated = isAuthenticatedFromContext ?? reduxIsAuth;

  const { cartItems, totalCartAmount, resetCart } = useCurrentCart();
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const todayStr = new Date().toISOString().split("T")[0];
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

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

  //-------------------- Tanstack Queries ------------------
  const { data: allTables = [], isLoading: isLoadingTables } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/tables`);
      if (!res.ok) throw new Error("Failed to fetch tables list");
      return res.json();
    },
  });

  const { data: existingBookings = [], isLoading: isLoadingBookings } =
    useQuery({
      queryKey: ["bookings", selectedDate],
      queryFn: async () => {
        if (!selectedDate) return [];
        const res = await fetch(
          `${API_BASE_URL}/bookings?date=${selectedDate}`,
        );
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      },
      enabled: Boolean(selectedDate),
    });

  //------------- Table Availability Computations----------------
  const suitableTables = useMemo(
    () => allTables.filter((tbl) => tbl.capacity >= selectedGuestCount),
    [allTables, selectedGuestCount],
  );

  const bookedTableIdsForSlot = useMemo(() => {
    if (!selectedTimeSlot) return new Set();
    return new Set(
      existingBookings
        .filter((b) => b.timeSlot === selectedTimeSlot)
        .map((b) => b.tableId),
    );
  }, [existingBookings, selectedTimeSlot]);

  const isSlotFullyBooked = (slot) => {
    if (suitableTables.length === 0) return false;
    const booked = new Set(
      existingBookings.filter((b) => b.timeSlot === slot).map((b) => b.tableId),
    );
    return suitableTables.every((tbl) => booked.has(tbl.id));
  };

  //------------------ Mutation(Book a table) -----------------
  const createBookingMutation = useMutation({
    mutationFn: async (newBooking) => {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
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

  //--------------------- Auth Guard Trigger------------------
  const handleButtonClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      e.stopPropagation();
      setToast({
        open: true,
        message:
          t("reservation.loginRequired") ||
          "Please log in to complete your table reservation.",
        severity: "error",
      });
      if (onOpenAuthModal) onOpenAuthModal();
    }
  };

  const onSubmit = (formData) => {
    const selectedTableObj = allTables.find((t) => t.id === formData.tableId);
    const payload = {
      ...formData,
      bookingId: `RES-${Date.now().toString().slice(-4)}`,
      userId: user?.id || "guest",
      tableDetails: selectedTableObj
        ? `Table ${selectedTableObj.number} (${selectedTableObj.location})`
        : "",
      createdAt: new Date().toISOString(),
      preOrders: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPreOrderAmount: totalCartAmount,
      status: "Confirmed",
    };
    createBookingMutation.mutate(payload);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 1,
            gap: 1.5,
          }}
        >
          <TableRestaurantIcon color="primary" sx={{ fontSize: 36 }} />
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            {t("reservation.title")}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, textAlign: "center" }}
        >
          {t("reservation.subtitle")}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ReservationContactFields
            register={register}
            control={control}
            errors={errors}
            selectedTimeSlot={selectedTimeSlot}
            isLoadingBookings={isLoadingBookings}
            isLoadingTables={isLoadingTables}
            suitableTables={suitableTables}
            bookedTableIdsForSlot={bookedTableIdsForSlot}
            isSlotFullyBooked={isSlotFullyBooked}
          />

          <Divider sx={{ my: 4 }} />

          <PreOrderSummarySection
            cartItems={cartItems}
            totalCartAmount={totalCartAmount}
            currentLang={currentLang}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={createBookingMutation.isPending}
            onClick={handleButtonClick}
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

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  Button,
  Alert,
  CircularProgress,
  Snackbar,
  Stack,
  useTheme,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";

//----------- Separate imported components---------
import UnauthenticatedView from "../components/UnauthenticatedView";
import BookingCard from "../components/BookingCard";
import CancelBookingDialog from "../components/CancelBookingDialog";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

//--------------- API Calls----------------
const fetchUserBookings = async (userEmail) => {
  const response = await fetch(
    `${API_BASE_URL}/bookings?email=${encodeURIComponent(userEmail)}`
  );
  if (!response.ok) throw new Error("Failed to fetch reservations");
  return response.json();
};

const cancelReservationApi = async (bookingId) => {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to cancel reservation");
  return response.json();
};

export default function MyBookingsPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { user, onOpenAuthModal } = useOutletContext();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedBookingToCancel, setSelectedBookingToCancel] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  //---------------Get the translated item name based on the current language----------------
  const getItemName = (nameObj) => {
    if (typeof nameObj === "object" && nameObj !== null) {
      return nameObj[i18n.language] || nameObj.en || "";
    }
    return nameObj || "";
  };

  //--------------- Fetch User Bookings ----------------
  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userBookings", user?.email],
    queryFn: () => fetchUserBookings(user.email),
    enabled: !!user?.email,
  });

  //--------------- Cancel Booking Mutation ----------------
  const cancelMutation = useMutation({
    mutationFn: cancelReservationApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["userBookings", user?.email]);
      setSelectedBookingToCancel(null);
      setToastMessage(
        t("myBookings.cancelSuccess") || "Reservation cancelled successfully"
      );
    },
    onError: () => {
      setToastMessage(
        t("myBookings.cancelError") || "Failed to cancel reservation"
      );
    },
  });

  //----------------Check if user is authenticated, if not show UnauthenticatedView----------------
  if (!user) {
    return (
      <UnauthenticatedView
        isDark={isDark}
        t={t}
        onOpenAuthModal={onOpenAuthModal}
      />
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/*------------------- Header -------------------*/}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            mb: 0.5,
          }}
        >
          <BookmarkBorderIcon sx={{ color: "#e5a93c", fontSize: 36 }} />
          <Typography
            variant="h4"
            sx={{
              fontWeight: "800",
              color: "text.primary",
              letterSpacing: "-0.5px",
            }}
          >
            {t("myBookings.title") || "My Reservations"}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "text.secondary",
          }}
        >
          {t("myBookings.subtitle") ||
            "Track and review all your upcoming and past dining bookings."}
        </Typography>
      </Box>

      {/*----------------- Loading & Error -----------------*/}
      {isLoading && (
        <Box display="flex" justifycontent="center" py={8}>
          <CircularProgress sx={{ color: "#e5a93c" }} />
        </Box>
      )}

      {isError && (
        <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
          {t("myBookings.fetchError") || "Failed to fetch reservations."}
        </Alert>
      )}

      {/*----------------- Empty State -----------------*/}
      {!isLoading && !isError && bookings.length === 0 && (
        <Card
          elevation={isDark ? 0 : 2}
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 4,
            bgcolor: isDark ? "#2d2d2d" : "#ffffff",
            color: "text.primary",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="600"
            color="text.secondary"
            gutterBottom
          >
            {t("myBookings.emptyTitle") || "No bookings found"}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/book")}
            sx={{
              mt: 2,
              bgcolor: "#e5a93c",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            {t("myBookings.bookNowBtn") || "Book A Table"}
          </Button>
        </Card>
      )}

      {/*---------------- Bookings List -------------------*/}
      {!isLoading && bookings.length > 0 && (
        <Stack spacing={3} sx={{ width: "100%" }}>
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              isDark={isDark}
              theme={theme}
              t={t}
              i18n={i18n}
              getItemName={getItemName}
              onSelectCancel={setSelectedBookingToCancel}
            />
          ))}
        </Stack>
      )}

      {/*---------------- Cancel Dialog -------------------*/}
      <CancelBookingDialog
        selectedBooking={selectedBookingToCancel}
        isDark={isDark}
        t={t}
        isPending={cancelMutation.isPending}
        onClose={() => setSelectedBookingToCancel(null)}
        onConfirm={() => cancelMutation.mutate(selectedBookingToCancel.id)}
      />

      <Snackbar
        open={!!toastMessage}
        autoHideDuration={4000}
        onClose={() => setToastMessage(null)}
        message={toastMessage}
      />
    </Container>
  );
}
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export default function CancelBookingDialog({
  selectedBooking,
  isDark,
  t,
  isPending,
  onClose,
  onConfirm,
}) {
  return (
    <Dialog
      open={!!selectedBooking}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          bgcolor: isDark ? "#2d2d2d" : "#ffffff",
          color: "text.primary",
          p: 1,
        },
      }}
    >
      <DialogTitle fontWeight="700">
        {t("myBookings.cancelDialogTitle") || "Cancel Reservation"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "text.secondary" }}>
          {t("myBookings.cancelDialogConfirmText", {
            id: selectedBooking?.bookingId || selectedBooking?.id,
          }) ||
            `Are you sure you want to cancel reservation #${selectedBooking?.id}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: "text.secondary" }}>
          {t("myBookings.keepReservationBtn") || "Keep Reservation"}
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={isPending}
          sx={{ borderRadius: 2 }}
        >
          {isPending
            ? t("myBookings.cancellingBtn") || "Cancelling..."
            : t("myBookings.confirmCancelBtn") || "Confirm Cancel"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
import React from "react";
import { Box, Button, Chip, Typography, Stack, Snackbar, Alert, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";

//-------------------- Custom Hook---------------------
import { useAdminReservation } from "../hooks/useAdminReservation";

//------------------- Modular Components----------------------
import ReservationStats from "../components/adminreservationtab/ReservationStats";
import ReservationFilters from "../components/adminreservationtab/ReservationFilters";
import ReservationTable from "../components/adminreservationtab/ReservationTable";
import ReservationDetailModal from "../components/adminreservationtab/ReservationDetailModal";

export default function AdminReservationTab() {
  const { t } = useTranslation();
  const adminState = useAdminReservation();

  //-------------------- Dynamic Status Chip Color Mapping---------------------
  const getStatusChip = (status) => {
    switch (status) {
      case "Confirmed":
      case "Preparing":
        return <Chip label={t("admin.reservationsTab.filters.statusConfirmed")} color="primary" variant="outlined" size="small" />;
      case "Seated":
        return <Chip label={t("admin.reservationsTab.filters.statusSeated")} color="warning" size="small" />;
      case "Completed":
        return <Chip label={t("admin.reservationsTab.filters.statusCompleted")} color="success" size="small" />;
      case "Cancelled":
        return <Chip label={t("admin.reservationsTab.filters.statusCancelled")} color="error" variant="outlined" size="small" />;
      default:
        return <Chip label={t("admin.reservationsTab.filters.statusUnknown")} size="small" />;
    }
  };

  if (adminState.isLoadingBookings || adminState.isLoadingTables) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/*---------------------- Header Banner -----------------------*/}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        
        alignitems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 3, justifyContent: "space-between" }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            {t("admin.reservationsTab.title", "Reservation Management")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("admin.reservationsTab.subtitle", "Track bookings, assign tables, and manage floor walk-ins.")}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={adminState.handleOpenModal}
          sx={{ borderRadius: 2 }}
        >
          {t("admin.reservationsTab.manualReservationBtn", "New Reservation")}
        </Button>
      </Stack>

      {/*------------------------- Analytics Cards ------------------------*/}
      <ReservationStats stats={adminState.stats} t={t} />

      {/*------------------------- Filters Toolbar ------------------------*/}
      <ReservationFilters
        searchQuery={adminState.searchQuery}
        setSearchQuery={adminState.setSearchQuery}
        selectedDate={adminState.selectedDate}
        setSelectedDate={adminState.setSelectedDate}
        statusFilter={adminState.statusFilter}
        setStatusFilter={adminState.setStatusFilter}
        shiftFilter={adminState.shiftFilter}
        setShiftFilter={adminState.setShiftFilter}
        t={t}
      />

      {/*------------------------- Paginated Data Table ------------------------*/}
      <ReservationTable
        paginatedBookings={adminState.paginatedBookings}
        filteredBookingsCount={adminState.filteredBookings.length}
        page={adminState.page}
        rowsPerPage={adminState.rowsPerPage}
        setPage={adminState.setPage}
        setRowsPerPage={adminState.setRowsPerPage}
        getStatusChip={getStatusChip}
        anchorEl={adminState.anchorEl}
        selectedBooking={adminState.selectedBooking}
        handleOpenMenu={adminState.handleOpenMenu}
        handleCloseMenu={adminState.handleCloseMenu}
        handleStatusUpdate={adminState.handleStatusUpdate}
        t={t}
      />

      {/*---------------Reservation Creation Dialog Modal -----------------*/}
      <ReservationDetailModal
        openModal={adminState.openModal}
        handleCloseModal={adminState.handleCloseModal}
        handleSubmit={adminState.handleSubmit}
        handleFormSubmit={adminState.handleFormSubmit}
        register={adminState.register}
        control={adminState.control}
        errors={adminState.errors}
        createBookingMutation={adminState.createBookingMutation}
        TIME_SLOTS={adminState.TIME_SLOTS}
        isSlotFullyBooked={adminState.isSlotFullyBooked}
        isLoadingBookings={adminState.isLoadingBookings}
        suitableTables={adminState.suitableTables}
        bookedTableIdsForSlot={adminState.bookedTableIdsForSlot}
        modalTimeSlot={adminState.modalTimeSlot}
        isLoadingTables={adminState.isLoadingTables}
        t={t}
      />

      {/*------------------ Snackbar Notifications --------------------*/}
      <Snackbar
        open={adminState.toast.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => adminState.setToast((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          severity={adminState.toast.severity}
          onClose={() => adminState.setToast((prev) => ({ ...prev, open: false }))}
          sx={{ width: "100%" }}
        >
          {adminState.toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
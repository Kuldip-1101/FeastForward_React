import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const TIME_SLOTS = [
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
];

export function useAdminReservation() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  //--------------- Local Filter & Pagination States----------------
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [shiftFilter, setShiftFilter] = useState("ALL");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //----------------- Menu Context State-----------------
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  //--------------- (New Reservation) Modal State-------------------
  const [openModal, setOpenModal] = useState(false);

  //--------------- Toast Notification State-------------------
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  //---------------- React Hook Form-----------------
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      guestCount: 2,
      date: new Date().toISOString().split("T")[0],
      timeSlot: "",
      tableId: "",
      specialRequests: "",
    },
  });

  const modalTimeSlot = watch("timeSlot");
  const modalDate = watch("date");
  const modalGuestCount = watch("guestCount");

  //----------------- Fetch Bookings from JSON Server------------------
  const { data: bookings = [], isLoading: isLoadingBookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/bookings`);
      if (!res.ok) throw new Error("Failed to fetch bookings");
      return res.json();
    },
  });

  //----------------- Fetch Tables from JSON Server------------------
  const { data: tables = [], isLoading: isLoadingTables } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/tables`);
      if (!res.ok) throw new Error(t("admin.reservationsTab.notifications.fetchError"));
      return res.json();
    },
  });

  //--------------- Create Booking Mutation-------------------
  const createBookingMutation = useMutation({
    mutationFn: async (newBooking) => {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      });
      if (!res.ok) throw new Error(t("admin.reservationsTab.notifications.createError"));
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setToast({
        open: true,
        message: t("admin.reservationsTab.notifications.createSuccess"),
        severity: "success",
      });
      handleCloseModal();
    },
    onError: (err) => {
      setToast({
        open: true,
        message: err.message || "Failed to create reservation",
        severity: "error",
      });
    },
  });

  //-------------------- Update Booking Status Mutation------------------
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(t("admin.reservationsTab.notifications.updateFailed"));
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setToast({
        open: true,
        message: t("admin.reservationsTab.notifications.updateSuccess") || "Status updated successfully",
        severity: "info",
      });
      handleCloseMenu();
    },
    onError: (err) => {
      setToast({
        open: true,
        message: err.message || "Failed to update status",
        severity: "error",
      });
    },
  });

  //-------------------------- Menu Handlers-----------------------
  const handleOpenMenu = (event, booking) => {
    setAnchorEl(event.currentTarget);
    setSelectedBooking(booking);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedBooking(null);
  };

  const handleStatusUpdate = (status) => {
    if (selectedBooking) {
      updateStatusMutation.mutate({ id: selectedBooking.id, status });
    }
  };

  //-------------------------- Modal Handlers-----------------------
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    reset();
  };

  const handleFormSubmit = (data) => {
    const selectedTableObj = tables.find((t) => t.id === data.tableId);
    const tableDetails = selectedTableObj
      ? `Table ${selectedTableObj.number} (${selectedTableObj.location})`
      : "";

    const payload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      date: data.date,
      timeSlot: data.timeSlot,
      tableId: data.tableId,
      guestCount: Number(data.guestCount),
      specialRequests: data.specialRequests || "",
      bookingId: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: "admin_manual",
      tableDetails,
      createdAt: new Date().toISOString(),
      preOrders: [],
      totalPreOrderAmount: 0,
      status: "Confirmed",
    };

    createBookingMutation.mutate(payload);
  };

  //------------------ Calculations: Booked tables & capacity-----------------
  const bookedTableIdsForSlot = useMemo(() => {
    if (!modalDate || !modalTimeSlot) return new Set();
    return new Set(
      bookings
        .filter(
          (b) =>
            b.date === modalDate &&
            b.timeSlot === modalTimeSlot &&
            b.status !== "Cancelled"
        )
        .map((b) => b.tableId)
    );
  }, [bookings, modalDate, modalTimeSlot]);

  const suitableTables = useMemo(() => {
    const guests = Number(modalGuestCount) || 1;
    return tables.filter((t) => t.capacity >= guests);
  }, [tables, modalGuestCount]);

  const isSlotFullyBooked = (slot) => {
    if (!modalDate) return false;
    const bookedCount = bookings.filter(
      (b) =>
        b.date === modalDate &&
        b.timeSlot === slot &&
        b.status !== "Cancelled"
    ).length;
    return bookedCount >= tables.length && tables.length > 0;
  };

  //-------------------- Compute filtering over bookings--------------------
  const filteredBookings = useMemo(() => {
    return bookings
      .map((b) => ({ ...b, computedStatus: b.status || "Confirmed" }))
      .filter((b) => {
        //-------------- Date match--------------
        if (selectedDate && b.date !== selectedDate) return false;

        //------------ Status match--------------
        if (statusFilter !== "ALL" && b.computedStatus !== statusFilter)
          return false;

        //----------------- Shift match (LUNCH: 12 PM - 3 PM, DINNER: 7 PM - 10 PM)------------
        if (shiftFilter !== "ALL") {
          const isLunch =
            b.timeSlot.includes("12:") ||
            b.timeSlot.includes("01:") ||
            b.timeSlot.includes("02:");
          if (shiftFilter === "LUNCH" && !isLunch) return false;
          if (shiftFilter === "DINNER" && isLunch) return false;
        }

        //----------------- Search match(query)------------------
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const nameMatch = (b.fullName || "").toLowerCase().includes(q);
          const phoneMatch = (b.phone || "").includes(q);
          const resIdMatch = (b.bookingId || b.id || "")
            .toLowerCase()
            .includes(q);
          return nameMatch || phoneMatch || resIdMatch;
        }

        return true;
      });
  }, [bookings, selectedDate, statusFilter, shiftFilter, searchQuery]);

  //-------------------- Paginated View--------------------
  const paginatedBookings = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredBookings.slice(start, start + rowsPerPage);
  }, [filteredBookings, page, rowsPerPage]);

  //-------------------- Operational Analytics--------------------
  const stats = useMemo(() => {
    const todaysBookings = bookings.filter(
      (b) => b.date === selectedDate && b.status !== "Cancelled"
    );
    const seatedCount = todaysBookings.filter(
      (b) => b.status === "Seated" || b.status === "Completed"
    ).length;
    const totalExpected = todaysBookings.length;

    const occupiedTablesCount = new Set(
      todaysBookings
        .filter((b) => b.status === "Seated")
        .map((b) => b.tableId)
    ).size;

    const specialNotesCount = todaysBookings.filter(
      (b) => (b.specialRequests && b.specialRequests.trim() !== "") || (b.preOrders && b.preOrders.length > 0)
    ).length;

    return {
      seatedVsExpected: `${seatedCount} / ${totalExpected}`,
      occupancyText: `${occupiedTablesCount} / ${tables.length}`,
      upcomingRush: `${todaysBookings.filter((b) => b.status === "Confirmed").length}`,
      specialNotesCount,
    };
  }, [bookings, tables, selectedDate]);

  return {
    stats,
    searchQuery,
    setSearchQuery,
    selectedDate,
    setSelectedDate,
    statusFilter,
    setStatusFilter,
    shiftFilter,
    setShiftFilter,
    paginatedBookings,
    filteredBookings,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    anchorEl,
    selectedBooking,
    handleOpenMenu,
    handleCloseMenu,
    handleStatusUpdate,
    openModal,
    handleOpenModal,
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
    toast,
    setToast,
  };
}
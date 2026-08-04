import React from "react";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import TableBarIcon from "@mui/icons-material/TableBar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const getStatItems = (stats, t) => [
  {
    key: "seatedVsExpected",
    label: t("admin.reservationsTab.stats.seatedVsExpected"),
    value: stats.seatedVsExpected,
    icon: <EventSeatIcon color="primary" />,
  },
  {
    key: "tableOccupancy",
    label: t("admin.reservationsTab.stats.tableOccupancy"),
    value: stats.occupancyText,
    icon: <TableBarIcon color="success" />,
  },
  {
    key: "next2HoursRush",
    label: t("admin.reservationsTab.stats.next2HoursRush"),
    value: t("admin.reservationsTab.stats.parties", { count: stats.upcomingRush }),
    icon: <AccessTimeIcon color="warning" />,
  },
  {
    key: "specialNotesPreOrders",
    label: t("admin.reservationsTab.stats.specialNotesPreOrders"),
    value: t("admin.reservationsTab.stats.notes", { count: stats.specialNotesCount }),
    icon: <AssignmentLateIcon color="info" />,
  },
];

export const getStatusOptions = (t) => [
  { value: "ALL", label: t("admin.reservationsTab.filters.allStatuses") },
  { value: "Confirmed", label: t("admin.reservationsTab.filters.statusConfirmed") },
  { value: "Seated", label: t("admin.reservationsTab.filters.statusSeated") },
  { value: "Completed", label: t("admin.reservationsTab.filters.statusCompleted") },
  { value: "Cancelled", label: t("admin.reservationsTab.filters.statusCancelled") },
];

export const getShiftOptions = (t) => [
  { value: "ALL", label: t("admin.reservationsTab.filters.allService") },
  { value: "LUNCH", label: t("admin.reservationsTab.filters.lunchShift") },
  { value: "DINNER", label: t("admin.reservationsTab.filters.dinnerShift") },
];

export const getMenuActions = (t) => [
  {
    status: "Seated",
    label: t("admin.reservationsTab.actions.markSeated"),
    icon: <EventSeatIcon fontSize="small" color="warning" />,
  },
  {
    status: "Completed",
    label: t("admin.reservationsTab.actions.markCompleted"),
    icon: <CheckCircleIcon fontSize="small" color="success" />,
  },
];

export const getTableHeaders = (t) => [
  { id: "idTime", label: t("admin.reservationsTab.table.idTime"), align: "left" },
  { id: "customer", label: t("admin.reservationsTab.table.customer"), align: "left" },
  { id: "tableZone", label: t("admin.reservationsTab.table.tableZone"), align: "left" },
  { id: "guests", label: t("admin.reservationsTab.table.guests"), align: "center" },
  { id: "notes", label: t("admin.reservationsTab.table.notesPreOrders"), align: "left" },
  { id: "status", label: t("admin.reservationsTab.table.status"), align: "center" },
  { id: "action", label: t("admin.reservationsTab.table.action"), align: "center" },
];
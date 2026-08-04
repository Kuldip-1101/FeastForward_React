import React from "react";
import {
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CancelIcon from "@mui/icons-material/Cancel";
import { getMenuActions } from "../../constants/adminReservationTabConstant";

export default function ReservationRow({
  booking,
  getStatusChip,
  anchorEl,
  activeBookingId,
  onOpenMenu,
  onCloseMenu,
  onStatusUpdate,
  t,
}) {
  const isMenuOpen = Boolean(anchorEl) && activeBookingId === booking.id;
  const menuActions = getMenuActions(t);

  return (
    <TableRow hover>

      {/* ------------------------- Booking Details ------------------------ */}
      <TableCell>
        <Typography variant="body2" fontWeight={700}>
          #{booking.bookingId || booking.id.slice(-5)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {booking.date} • {booking.timeSlot}
        </Typography>
      </TableCell>
      
      {/*------------------------- Customer Details ------------------------*/}
      <TableCell>
        <Typography variant="body2" fontWeight={600}>
          {booking.fullName || booking.customer?.name || t("admin.reservationsTab.table.guest")}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {booking.phone || booking.customer?.phone || "N/A"}
        </Typography>
      </TableCell>

      {/*------------------------- Table & Guest Count ------------------------*/}
      <TableCell>
        <Typography variant="body2">
          {booking.tableDetails || `Table ${booking.tableId || t("admin.reservationsTab.table.unassigned")}`}
        </Typography>
      </TableCell>

      {/*------------------------- Guest Count ------------------------*/}
      <TableCell align="center">
        <Typography fontWeight={600}>{booking.guestCount}</Typography>
      </TableCell>

      {/*------------------------- Special Requests / Pre-Orders ------------------------*/}
      <TableCell>
        <Typography
          variant="caption"
          display="block"
          color="text.secondary"
          noWrap
          sx={{ maxWidth: 200 }}
        >
          {booking.specialRequests ||
            (booking.preOrders?.length
              ? t("admin.reservationsTab.table.preOrderedItems", { count: booking.preOrders.length })
              : t("admin.reservationsTab.table.none"))}
        </Typography>
      </TableCell>

      {/*------------------------- Status & Actions ------------------------*/}
      <TableCell align="center">
        {getStatusChip(booking.computedStatus)}
      </TableCell>

      {/*------------------------- Actions Menu ------------------------*/}
      <TableCell align="center">
        <IconButton size="small" onClick={(e) => onOpenMenu(e, booking)}>
          <MoreVertIcon />
        </IconButton>

        <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={onCloseMenu}>
          {menuActions.map((action) => (
            <MenuItem key={action.status} onClick={() => onStatusUpdate(action.status)}>
              <ListItemIcon>{action.icon}</ListItemIcon>
              <ListItemText>{action.label}</ListItemText>
            </MenuItem>
          ))}
          <Divider />
          <MenuItem onClick={() => onStatusUpdate("Cancelled")}>
            <ListItemIcon>
              <CancelIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText color="error.main">
              {t("admin.reservationsTab.actions.cancelBooking")}
            </ListItemText>
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
}
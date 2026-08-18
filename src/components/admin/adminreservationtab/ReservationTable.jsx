import React from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Typography,
} from "@mui/material";
import ReservationRow from "./ReservationRow";
import { getTableHeaders } from "../../../constants/adminReservationTabConstant";

export default function ReservationTable({
  paginatedBookings,
  filteredBookingsCount,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  getStatusChip,
  anchorEl,
  selectedBooking,
  handleOpenMenu,
  handleCloseMenu,
  handleStatusUpdate,
  t,
}) {
  const tableHeaders = getTableHeaders(t);

  return (
    <Paper variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
      <TableContainer>
        <Table sx={{ minWidth: 800 }}>
          <TableHead sx={{ backgroundColor: "action.hover" }}>
            <TableRow>
              {tableHeaders.map((head) => (
                <TableCell key={head.id} align={head.align}>
                  <b>{head.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                  <Typography color="text.secondary">
                    {t("admin.reservationsTab.table.noMatch")}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedBookings.map((b) => (
                <ReservationRow
                  key={b.id}
                  booking={b}
                  getStatusChip={getStatusChip}
                  anchorEl={anchorEl}
                  activeBookingId={selectedBooking?.id}
                  onOpenMenu={handleOpenMenu}
                  onCloseMenu={handleCloseMenu}
                  onStatusUpdate={handleStatusUpdate}
                  t={t}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredBookingsCount}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </Paper>
  );
}
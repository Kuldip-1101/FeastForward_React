import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableRow, TableCell, Typography, Box, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { renderStatusChip } from '../../../constants/StatusChipConst';

export default function BookingTableRow({ booking, onOpenMenu }) {
  const { t } = useTranslation();
  const preOrderCount = booking.preOrders ? booking.preOrders.length : 0;
  const totalPreOrderVal = booking.totalPreOrderAmount || 0;

  return (
    <TableRow hover>
      <TableCell>
        <Typography variant="body2" fontWeight="bold">
          #{booking.bookingId || booking.id}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2" fontWeight="bold">
          {booking.fullName}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          {booking.email}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{booking.date}</Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          {booking.timeSlot}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2" color="text.primary">
          {booking.tableDetails || t('admin.dashboardTab.table.notAvailable')}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Typography variant="body2" fontWeight="medium">
          {booking.guestCount}
        </Typography>
      </TableCell>

      <TableCell>
        {preOrderCount > 0 ? (
          <Box>
            <Typography variant="body2" fontWeight="medium">
              {t('admin.dashboardTab.table.itemsCount', { count: preOrderCount })}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              (₹{totalPreOrderVal})
            </Typography>
          </Box>
        ) : (
          <Typography variant="caption" color="text.secondary">
            {t('admin.dashboardTab.table.noPreOrders')}
          </Typography>
        )}
      </TableCell>

      <TableCell align="center">
        {renderStatusChip(booking.computedStatus, t)}
      </TableCell>

      <TableCell align="center">
        <IconButton size="small" onClick={(e) => onOpenMenu(e, booking)}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
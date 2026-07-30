import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { getStatusChipConfig } from '../../constants/bookingStatusChipConst';

export default function BookingHeader({ booking, currentStatus, isDark, t }) {
  const statusConfig = getStatusChipConfig(currentStatus, isDark, t);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        mb: 2,
      }}
    >
      <Box>
        <Typography
          variant="h5"
          fontWeight="800"
          sx={{
            color: isDark ? '#e5a93c' : '#b37b12',
            fontSize: '1.4rem',
            mb: 0.5,
          }}
        >
          {booking.tableDetails ||
            booking.tableName ||
            t('myBookings.reservedTable') ||
            'Reserved Table'}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('myBookings.bookingRef')}: #{booking.bookingId || booking.id}
        </Typography>
      </Box>

      <Chip
        label={statusConfig.label}
        sx={{
          bgcolor: statusConfig.bgcolor,
          color: statusConfig.color,
          fontWeight: '700',
          fontSize: '0.85rem',
          height: 32,
          borderRadius: '16px',
          px: 1,
        }}
      />
    </Box>
  );
}
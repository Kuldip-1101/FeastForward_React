import React from 'react';
import { Box, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutlineOutlined';

export default function BookingDetailsRow({ booking, t }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: { xs: 3, sm: 6, md: 15 },
        mb: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.primary' }} />
        <Typography variant="body1" fontWeight="600" sx={{ color: 'text.primary' }}>
          {booking.date}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AccessTimeIcon sx={{ fontSize: 18, color: 'text.primary' }} />
        <Typography variant="body1" fontWeight="600" sx={{ color: 'text.primary' }}>
          {booking.timeSlot}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PeopleOutlineIcon sx={{ fontSize: 20, color: 'text.primary' }} />
        <Typography variant="body1" fontWeight="600" sx={{ color: 'text.primary' }}>
          {t('myBookings.guestsCount', { count: booking.guestCount }) || `${booking.guestCount} Guests`}
        </Typography>
      </Box>
    </Box>
  );
}
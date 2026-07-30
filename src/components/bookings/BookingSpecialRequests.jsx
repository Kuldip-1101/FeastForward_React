import React from 'react';
import { Box, Typography } from '@mui/material';

export default function BookingSpecialRequests({ specialRequests, isDark, t }) {
  if (!specialRequests) return null;

  return (
    <Box
      sx={{
        mb: 2.5,
        p: 2,
        bgcolor: isDark ? '#222426' : '#f5f5f5',
        borderRadius: '12px',
      }}
    >
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}
      >
        {t('myBookings.specialRequests') || 'Special Requests'}:
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.primary', fontStyle: 'italic' }}>
        "{specialRequests}"
      </Typography>
    </Box>
  );
}
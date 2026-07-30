import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { formatLocalizedPrice, formatTotalCartPrice } from '../../utils/formatCurrency';

export default function BookingPreOrders({ preOrders, totalInrAmount, isDark, t, i18n, getItemName }) {
  if (!preOrders || preOrders.length === 0) return null;

  return (
    <Box
      sx={{
        bgcolor: isDark ? '#222426' : '#f9f9f9',
        borderRadius: '16px',
        p: 3,
        mt: 2,
        border: isDark ? 'none' : '1px solid #eee',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          mb: 2,
        }}
      >
        <RestaurantIcon sx={{ fontSize: 18, color: isDark ? '#e5a93c' : '#b37b12' }} />
        <Typography variant="subtitle1" fontWeight="700" sx={{ color: 'text.primary' }}>
          {t('myBookings.preOrderTitle') || 'Pre-Ordered Dishes'}
        </Typography>
      </Box>

      {preOrders.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 0.8,
          }}
        >
          <Typography variant="body1" fontWeight="600" sx={{ color: 'text.primary' }}>
            {getItemName(item.name)} × {item.quantity}
          </Typography>
          <Typography variant="body1" fontWeight="700" sx={{ color: 'text.primary' }}>
            {formatLocalizedPrice(item.price, item.quantity, i18n.language)}
          </Typography>
        </Box>
      ))}

      <Divider
        sx={{
          my: 2,
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        }}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="body1" fontWeight="700" sx={{ color: 'text.primary' }}>
          {t('myBookings.totalPreOrderAmount')}:
        </Typography>
        <Typography variant="body1" fontWeight="800" sx={{ color: 'text.primary' }}>
          {formatTotalCartPrice(preOrders, totalInrAmount, i18n.language)}
        </Typography>
      </Box>
    </Box>
  );
}
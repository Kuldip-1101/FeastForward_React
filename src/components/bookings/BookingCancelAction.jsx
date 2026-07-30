import React from 'react';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function BookingCancelAction({ canBeCancelled, booking, onSelectCancel, t }) {
  if (!canBeCancelled) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
      <Button
        variant="outlined"
        color="error"
        size="medium"
        startIcon={<DeleteIcon />}
        onClick={() => onSelectCancel(booking)}
        sx={{
          textTransform: 'none',
          borderRadius: '10px',
          borderColor: '#ff5252',
          color: '#ff5252',
          fontWeight: '600',
          px: 2.5,
          '&:hover': {
            borderColor: '#ff1744',
            bgcolor: 'rgba(255, 82, 82, 0.1)',
          },
        }}
      >
        {t('myBookings.cancelReservationBtn') || 'Cancel Reservation'}
      </Button>
    </Box>
  );
}
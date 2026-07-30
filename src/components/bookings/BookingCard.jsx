import React from 'react';
import { Card, CardContent, Divider } from '@mui/material';

import BookingHeader from './BookingHeader';
import BookingDetailsRow from './BookingDetailsRow';
import BookingSpecialRequests from './BookingSpecialRequests';
import BookingPreOrders from './BookingPreOrders';
import BookingCancelAction from './BookingCancelAction';

export default function BookingCard({
  booking,
  isDark,
  theme,
  t,
  i18n,
  getItemName,
  onSelectCancel,
}) {
  const todayStr = new Date().toISOString().split('T')[0];

  //----------------- Compute status fallback-------------
  let currentStatus = booking.status;
  if (!currentStatus) {
    if (booking.date < todayStr) currentStatus = 'Completed';
    else if (booking.date === todayStr) currentStatus = 'Preparing';
    else currentStatus = 'Confirmed';
  }

  const canBeCancelled = currentStatus !== 'Completed' && currentStatus !== 'Cancelled';

  const totalInrAmount =
    booking.totalPreOrderAmount ||
    (booking.preOrders || []).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

  return (
    <Card
      elevation={isDark ? 0 : 2}
      sx={{
        width: '100%',
        borderRadius: '24px',
        bgcolor: isDark ? '#323538' : '#ffffff',
        color: 'text.primary',
        boxSizing: 'border-box',
        border: isDark ? 'none' : `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent
        sx={{
          p: { xs: 3, sm: 4 },
          '&:last-child': { pb: { xs: 3, sm: 4 } },
        }}
      >
        <BookingHeader
          booking={booking}
          currentStatus={currentStatus}
          isDark={isDark}
          t={t}
        />

        <Divider
          sx={{
            my: 2.5,
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
          }}
        />

        <BookingDetailsRow booking={booking} t={t} />

        <BookingSpecialRequests
          specialRequests={booking.specialRequests}
          isDark={isDark}
          t={t}
        />

        <BookingPreOrders
          preOrders={booking.preOrders}
          totalInrAmount={totalInrAmount}
          isDark={isDark}
          t={t}
          i18n={i18n}
          getItemName={getItemName}
        />

        <BookingCancelAction
          canBeCancelled={canBeCancelled}
          booking={booking}
          onSelectCancel={onSelectCancel}
          t={t}
        />
      </CardContent>
    </Card>
  );
}
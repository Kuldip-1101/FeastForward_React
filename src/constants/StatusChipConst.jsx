import React from 'react';
import { Chip } from '@mui/material';

export const renderStatusChip = (status, t) => {
  const statusKeyMap = {
    Completed: { key: 'admin.dashboardTab.status.completed', color: 'success' },
    Preparing: { key: 'admin.dashboardTab.status.preparing', color: 'warning' },
    Confirmed: { key: 'admin.dashboardTab.status.confirmed', color: 'info' },
    Cancelled: { key: 'admin.dashboardTab.status.cancelled', color: 'error' },
  };

  const config = statusKeyMap[status] || {
    key: 'admin.dashboardTab.status.pending',
    color: 'default',
  };

  return (
    <Chip
      label={t(config.key)}
      color={config.color}
      size="small"
      sx={{ fontWeight: 'bold' }}
    />
  );
};
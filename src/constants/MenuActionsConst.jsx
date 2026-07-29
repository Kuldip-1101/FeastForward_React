import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';

export const MENU_ACTIONS_CONFIG = [
  {
    labelKey: 'admin.dashboardTab.actions.markPreparing',
    status: 'Preparing',
    icon: <ChairOutlinedIcon fontSize="small" color="warning" />,
  },
  {
    labelKey: 'admin.dashboardTab.actions.markCompleted',
    status: 'Completed',
    icon: <CheckCircleOutlineIcon fontSize="small" color="success" />,
  },
  {
    labelKey: 'admin.dashboardTab.actions.cancelReservation',
    status: 'Cancelled',
    icon: <CancelOutlinedIcon fontSize="small" color="error" />,
    isDividerBefore: true,
    textColor: 'error.main',
  },
];
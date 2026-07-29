import React from 'react';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import TodayIcon from '@mui/icons-material/Today';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

export const SUMMARY_CARDS_CONFIG = [
  {
    key: 'totalBookings',
    labelKey: 'admin.dashboardTab.stats.totalBookings',
    icon: <EventSeatIcon sx={{ fontSize: 28 }} color="warning" />,
  },
  {
    key: 'todaysBookings',
    labelKey: 'admin.dashboardTab.stats.todaysBookings',
    icon: <TodayIcon sx={{ fontSize: 28 }} color="primary" />,
  },
  {
    key: 'todaysGuests',
    labelKey: 'admin.dashboardTab.stats.todaysGuests',
    icon: <PeopleAltIcon sx={{ fontSize: 28 }} color="info" />,
  },
  {
    key: 'pendingActionCount',
    labelKey: 'admin.dashboardTab.stats.pendingActions',
    icon: <PendingActionsIcon sx={{ fontSize: 28 }} color="error" />,
  },
];
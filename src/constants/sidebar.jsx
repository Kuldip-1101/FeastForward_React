import DashboardIcon from '@mui/icons-material/Dashboard';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AnalyticsIcon from '@mui/icons-material/Analytics';

export const ADMIN_SIDEBAR_ITEMS = [
  {
    text: 'Dashboard',
    translationKey: 'admin.dashboard',
    path: '/admin/dashboard',
    icon: <DashboardIcon />,
  },
  {
    text: 'Reservations',
    translationKey: 'admin.reservations',
    path: '/admin/reservations',
    icon: <BookOnlineIcon />,
  },
  {
    text: 'Menu Management',
    translationKey: 'admin.menuManagement',
    path: '/admin/menu',
    icon: <RestaurantMenuIcon />,
  },
  {
    text: 'Analytics',
    translationKey: 'admin.analytics',
    path: '/admin/analytics',
    icon: <AnalyticsIcon />,
  },
];
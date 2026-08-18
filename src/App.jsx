import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getCustomTheme } from './config/theme';

//-------------- Layouts -----------------
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';
import PageSEO from './components/common/PageSEO';

//-------------- Protection Wrappers -----------------
import { CustomerRoute, AdminRoute } from './components/ProtectedRoutes';

//------------------ Pages -----------------
import Home from './pages/Home';
import Menu from './pages/Menu';
import ReservationPage from './pages/ReservationPage';
import MyBookingsPage from './pages/MyBookingsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminReservationTab from './pages/admin/AdminReservationTab';
import AdminMenuTab from './pages/admin/AdminMenuTab';
import AdminAnalyticsTab from './pages/admin/AdminAnalyticsTab';
import NotFoundRedirect from './components/navbar/NotFoundRedirect';


const router = createBrowserRouter([
  // ---------------- CUSTOMER BRANCH ----------------
  {
    element: <CustomerRoute />,
    children: [
      {
        element: <CustomerLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'menu', element: <Menu /> },
          { path: 'book-table', element: <ReservationPage /> },
          { path: 'my-bookings', element: <MyBookingsPage /> },
        ],
      },
    ],
  },

  // ---------------- ADMIN BRANCH ----------------
  {
    path: 'admin',
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'reservations', element: <AdminReservationTab /> },
          { path: 'menu', element: <AdminMenuTab /> },
          { path: 'analytics', element: <AdminAnalyticsTab /> },
        ],
      },
    ],
  },

  // ---------------- 404 CATCH-ALL ROUTE ----------------
  {
    path: '*',
    element: <NotFoundRedirect />,
  },
]);

function App() {
  const { t } = useTranslation();
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const theme = getCustomTheme(isDarkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/*--------------- SEO Meta Tags ---------------*/}
      <PageSEO
        title={t('seo.title', 'FeastForward - Luxury Dining & Instant Pre-Order')}
        description={t('seo.description', 'Experience absolute luxury culinary dining.')}
      />

      {/* ----------- Router Engine --------------*/}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
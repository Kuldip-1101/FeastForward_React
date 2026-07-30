import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getCustomTheme } from './config/theme';

//-------------- Layouts -----------------
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';

//-------------- Protection Wrappers -----------------
import { CustomerRoute, AdminRoute } from './components/ProtectedRoutes';

//------------------ Pages -----------------
import Home from './pages/Home';
import Menu from './pages/Menu';
import Bookings from './pages/Bookings';
import ReservationPage from './pages/ReservationPage';
import MyBookingsPage from './pages/MyBookingsPage';
import AdminDashboard from './pages/AdminDashboard';
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

      <Helmet>
        <title>{t('seoTitle')}</title>
        <meta name="description" content={t('seoDesc')} />
      </Helmet>

      {/* ----------- Router Engine --------------*/}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
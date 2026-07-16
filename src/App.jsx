import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getCustomTheme } from './config/theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Bookings from './pages/Bookings';

function App() {
  const { t } = useTranslation();
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const theme = getCustomTheme(isDarkMode);

  //------ Define our route tree -------
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />, //-----Root element ------
      children: [
        {
          index: true, 
          element: <Home />
        },
        {
          path: 'menu',
          element: <Menu />
        },
        {
          path: 'bookings',
          element: <Bookings />
        }
      ]
    }
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Helmet>
        <title>{t('seoTitle')}</title>
        <meta name="description" content={t('seoDesc')} />
      </Helmet>

      {/* ----------- router engine --------------*/}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
/**
 * Configuration mapping for status chips across the application.
 *
 * @param {string} status - Current reservation status
 * @param {boolean} isDark - Dark mode flag
 * @param {Function} t - i18next translation function
 */
 
export const getStatusChipConfig = (status, isDark, t) => {
  const STATUS_MAP = {
    Completed: {
      label: t('myBookings.statusCompleted') || 'Completed',
      bgcolor: isDark ? '#4a4a4a' : '#e0e0e0',
      color: isDark ? '#ffffff' : '#000000',
    },
    Preparing: {
      label: t('admin.dashboardTab.status.preparing') || 'Preparing',
      bgcolor: '#ff9800',
      color: '#ffffff',
    },
    Cancelled: {
      label: t('admin.dashboardTab.status.cancelled') || 'Cancelled',
      bgcolor: '#f44336',
      color: '#ffffff',
    },
    Confirmed: {
      label: t('myBookings.statusUpcoming') || 'Upcoming',
      bgcolor: '#e5a93c',
      color: '#000000',
    },
  };

  return (
    STATUS_MAP[status] || {
      label: t('myBookings.statusUpcoming') || 'Upcoming',
      bgcolor: '#e5a93c',
      color: '#000000',
    }
  );
};
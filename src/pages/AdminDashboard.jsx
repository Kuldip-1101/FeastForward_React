import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TablePagination,
} from '@mui/material';

import SummaryCard from '../components/admindashboard/SummaryCard';
import BookingTableRow from '../components/admindashboard/BookingTableRow';
import { SUMMARY_CARDS_CONFIG } from '../constants/SummaryCardConst';
import { MENU_ACTIONS_CONFIG } from '../constants/MenuActionsConst';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

//--------------Fetch Data from API ------------------
const fetchBookings = async () => {
  const res = await fetch(`${API_BASE_URL}/bookings`);
  if (!res.ok) throw new Error(`Failed to fetch bookings: ${res.statusText}`);
  return res.json();
};

const updateBookingStatus = async ({ id, status }) => {
  const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update status');
  return res.json();
};

export default function AdminDashboard() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  //-----------------Table Action States---------------
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  //-----------------Pagination States ----------------
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //--------------------Tan Stack query to handle the data-----------
  const { data: rawBookings = [], isLoading, isError } = useQuery({
    queryKey: ['bookings'],
    queryFn: fetchBookings,
    refetchInterval: 15000,
  });

  const statusMutation = useMutation({
    mutationFn: updateBookingStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });

  //---------------- Compute summary States and update booking for status -------------
  const { bookings, stats } = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];

    const processed = rawBookings.map((booking) => {
      let computedStatus = booking.status;
      if (!computedStatus) {
        if (booking.date < todayStr) computedStatus = 'Completed';
        else if (booking.date === todayStr) computedStatus = 'Preparing';
        else computedStatus = 'Confirmed';
      }
      return { ...booking, computedStatus };
    });

    //---------------- Exclude 'Completed' from Total Bookings------------
    const totalBookings = processed.length;
    
    const todaysBookings = processed.filter((b) => b.date === todayStr).length;
    const todaysGuests = processed
      .filter((b) => b.date === todayStr)
      .reduce((acc, curr) => acc + (Number(curr.guestCount) || 0), 0);

    const pendingActionCount = processed.filter(
      (b) =>
        b.computedStatus !== 'Completed' &&
        b.computedStatus !== 'Cancelled' &&
        (b.computedStatus === 'Preparing' || (b.specialRequests && b.specialRequests.trim() !== ''))
    ).length;

    // ----------------Sort strictly by Date (Newest dates first)--------------
    const sorted = [...processed].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (dateB !== dateA) return dateB - dateA; // Descending Date
      
      // Fallback: If dates are identical, sort by creation time
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });

    return {
      bookings: sorted,
      stats: { totalBookings, todaysBookings, todaysGuests, pendingActionCount },
    };
  }, [rawBookings]);

  //----------------- Pagination Handlers --------------
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); //---- Reset to first page whenever rows per page changes
  };

  //------------Slice bookings array to only show the current page's records----------
  const paginatedBookings = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return bookings.slice(startIndex, startIndex + rowsPerPage);
  }, [bookings, page, rowsPerPage]);


  //----------------- Open the anchor menu --------------
  const handleOpenMenu = (event, booking) => {
    setAnchorEl(event.currentTarget);
    setSelectedBooking(booking);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedBooking(null);
  };

  const handleStatusUpdate = (newStatus) => {
    if (!selectedBooking) return;
    statusMutation.mutate({ id: selectedBooking.id, status: newStatus });
    handleCloseMenu();
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70%' }}>
        <CircularProgress color="warning" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70%' }}>
        <Typography color="error">{t('admin.dashboardTab.overview.error')}</Typography>
      </Box>
    );
  }

  return (
    <Box p={{ xs: 2.5, md: 4 }} sx={{ width: '100%' }}>
      {/*--------------------- Header --------------------*/}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: 600 }} gutterBottom>
          {t('admin.dashboardTab.overview.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('admin.dashboardTab.overview.subtitle')}
        </Typography>
      </Box>

      {/*---------------------- Summary Cards Grid --------------------*/}
      <Grid container spacing={3} mb={5} sx={{ width: '100%' }}>
        {SUMMARY_CARDS_CONFIG.map((cardConfig) => (
          <Grid key={cardConfig.key} size={{ xs: 12, sm: 6, md: 3 }}>
            <SummaryCard
              label={t(cardConfig.labelKey)}
              value={stats[cardConfig.key]}
              icon={cardConfig.icon}
            />
          </Grid>
        ))}
      </Grid>

      {/*----------------------- Reservation Table --------------------*/}
      <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden', mt: 4, p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            {t('admin.dashboardTab.table.title')}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {t('admin.dashboardTab.table.subtitle')}
          </Typography>
        </Box>

        <Divider sx={{ mb: 1 }} />

        <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                <TableCell><b>{t('admin.dashboardTab.table.colId')}</b></TableCell>
                <TableCell><b>{t('admin.dashboardTab.table.colCustomer')}</b></TableCell>
                <TableCell><b>{t('admin.dashboardTab.table.colDateTime')}</b></TableCell>
                <TableCell><b>{t('admin.dashboardTab.table.colTable')}</b></TableCell>
                <TableCell align="center"><b>{t('admin.dashboardTab.table.colGuests')}</b></TableCell>
                <TableCell><b>{t('admin.dashboardTab.table.colPreOrders')}</b></TableCell>
                <TableCell align="center"><b>{t('admin.dashboardTab.table.colStatus')}</b></TableCell>
                <TableCell align="center"><b>{t('admin.dashboardTab.table.colAction')}</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      {t('admin.dashboardTab.table.empty')}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                //-----------Render paginatedBookings instead of full bookings array--------
                paginatedBookings.map((booking) => (
                  <BookingTableRow
                    key={booking.id}
                    booking={booking}
                    onOpenMenu={handleOpenMenu}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/*------------------------ Pagination Component ---------------------*/}
        <TablePagination
          component="div"
          count={bookings.length} //---------- Total rows in the database
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15]} //-------- Dropdown options for rows per page
        />

        {/*------------------------ Menu ---------------------*/}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {MENU_ACTIONS_CONFIG.map((action) => (
            <React.Fragment key={action.status}>
              {action.isDividerBefore && <Divider />}
              <MenuItem onClick={() => handleStatusUpdate(action.status)}>
                <ListItemIcon>{action.icon}</ListItemIcon>
                <ListItemText sx={{ color: action.textColor || 'inherit' }}>
                  {t(action.labelKey)}
                </ListItemText>
              </MenuItem>
            </React.Fragment>
          ))}
        </Menu>
      </Paper>
    </Box>
  );
}
import { Container, Typography } from '@mui/material';

function Bookings() {
  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
        Table Reservations
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Secure your absolute luxury dining experience here shortly.
      </Typography>
    </Container>
  );
}

export default Bookings;
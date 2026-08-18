import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function SummaryCard({ label, value, icon }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, height: '100%', width: '100%' }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          p: 3,
          '&:last-child': { pb: 3 },
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight="bold"
          sx={{ textTransform: 'uppercase', letterSpacing: 1.2, mb: 1.5 }}
        >
          {label}
        </Typography>

        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
          {value}
        </Typography>

        <Box
          sx={{
            bgcolor: 'action.hover',
            p: 1.5,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}
import React from "react";
import { Container, Box, Typography, Grid, Paper } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// Reusable Service Hour Card Component to eliminate repetition
function HoursCard({ title, hours, isDark, borderColor, primaryText }) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
        border: `1px solid ${borderColor}`,
      }}
    >
      <AccessTimeIcon sx={{ color: "#E5A93C", mb: 1 }} />
      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: primaryText }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {hours}
      </Typography>
    </Box>
  );
}

export default function OperatingHoursSection({ t, cardBg, borderColor, primaryText, isDark }) {
  return (
    <Container maxWidth="md" sx={{ mb: 10 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          backgroundColor: cardBg,
          borderRadius: 4,
          border: `1px solid ${borderColor}`,
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#66BB6A",
              boxShadow: "0 0 8px #66BB6A",
            }}
          />
          <Typography variant="caption" sx={{ fontWeight: 800, color: "#66BB6A", letterSpacing: 1 }}>
            {t("home.openToday", "OPEN TODAY")}
          </Typography>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 800, color: primaryText, mb: 4 }}>
          {t("home.operatingHours", "Operating Hours")}
        </Typography>

        <Grid container spacing={3}>
          <Grid item size={{ xs: 12, sm: 6 }}>
            <HoursCard
              title={t("home.lunchService", "Lunch Service")}
              hours={t("home.lunchHours", "11:30 AM – 2:30 PM")}
              isDark={isDark}
              borderColor={borderColor}
              primaryText={primaryText}
            />
          </Grid>

          <Grid item size={{ xs: 12, sm: 6 }}>
            <HoursCard
              title={t("home.dinnerService", "Dinner Service")}
              hours={t("home.dinnerHours", "6:30 PM – 11:00 PM")}
              isDark={isDark}
              borderColor={borderColor}
              primaryText={primaryText}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
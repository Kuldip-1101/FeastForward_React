import React from "react";
import { Card, Box, Typography, Button, Container } from "@mui/material";
import LockIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function UnauthenticatedView({ isDark, t, onOpenAuthModal }) {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card
        elevation={isDark ? 0 : 2}
        sx={{
          textAlign: "center",
          p: 4,
          borderRadius: 4,
          bgcolor: isDark ? "#2b2b2b" : "#ffffff",
          color: "text.primary",
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(229,169,60,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <LockIcon sx={{ fontSize: 32, color: "#e5a93c" }} />
        </Box>
        <Typography variant="h5" fontWeight="700" gutterBottom>
          {t("myBookings.loginRequiredTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t("myBookings.loginRequiredDesc")}
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={onOpenAuthModal}
          endIcon={<ArrowForwardIcon />}
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: 2,
            bgcolor: "#e5a93c",
            color: "#000",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#c9922e" },
          }}
        >
          {t("login")}
        </Button>
      </Card>
    </Container>
  );
}
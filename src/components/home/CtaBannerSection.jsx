import React from "react";
import { Container, Paper, Typography, Button } from "@mui/material";

export default function CtaBannerSection({ t, navigate }) {
  return (
    <Container maxWidth="lg">
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, sm: 8 },
          borderRadius: 5,
          background: "linear-gradient(135deg, #E5A93C 0%, #b87b1e 100%)",
          color: "#121212",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: "2rem", sm: "3rem" } }}>
          {t("home.ctaTitle", "Ready to Feast?")}
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: "auto", mb: 4, fontWeight: 500 }}>
          {t(
            "home.ctaSubtitle",
            "Reserve your preferred table now and pre-order your meals for an unforgettable dining experience."
          )}
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/book-table")}
          sx={{
            backgroundColor: "#121212",
            color: "#FFFFFF",
            fontWeight: 800,
            px: 5,
            py: 1.8,
            borderRadius: 3,
            fontSize: "1.05rem",
            "&:hover": { backgroundColor: "#2a2a2a" },
          }}
        >
          {t("home.reserveNow", "RESERVE NOW")}
        </Button>
      </Paper>
    </Container>
  );
}
import React from "react";
import { Container, Box, Typography, Button, Chip, Stack, Grid } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import StarIcon from "@mui/icons-material/Star";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function HeroSection({ t, navigate, isDark, primaryText, secondaryText, borderColor }) {
  return (
    <Box
      sx={{
        position: "relative",
        pt: { xs: 8, md: 12 },
        pb: { xs: 10, md: 16 },
        px: 2,
        overflow: "hidden",
        background: isDark
          ? "radial-gradient(circle at 50% 20%, rgba(229, 169, 60, 0.12) 0%, rgba(18, 18, 18, 0) 70%)"
          : "radial-gradient(circle at 50% 20%, rgba(229, 169, 60, 0.18) 0%, rgba(250, 250, 250, 0) 70%)",
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <Chip
          icon={<AutoAwesomeIcon sx={{ fontSize: "16px !important", color: "#E5A93C" }} />}
          label={t("home.heroBadge", "✦ Luxury Dining & Instant Pre-Order")}
          sx={{
            backgroundColor: isDark ? "rgba(229, 169, 60, 0.1)" : "rgba(229, 169, 60, 0.2)",
            color: "#E5A93C",
            fontWeight: 700,
            mb: 3,
            px: 1,
            border: "1px solid rgba(229, 169, 60, 0.3)",
          }}
        />

        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "2.5rem", sm: "3.8rem", md: "4.5rem" },
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            mb: 2.5,
          }}
        >
          {t("home.welcome", "Welcome to FeastForward")}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: secondaryText,
            maxWidth: "680px",
            mx: "auto",
            mb: 4,
            fontWeight: 400,
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          {t(
            "home.subtitle",
            "Experience absolute luxury culinary dining. Reserve your table, pre-order signature gourmet dishes, and enjoy seamless service without delays."
          )}
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifycontent="center"
          alignitems="center"
          sx={{ mb: 6 }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<CalendarMonthIcon />}
            onClick={() => navigate("/book-table")}
            sx={{
              backgroundColor: "#E5A93C",
              color: "#121212",
              fontWeight: 800,
              px: 4,
              py: 1.6,
              borderRadius: 3,
              fontSize: "1rem",
              "&:hover": { backgroundColor: "#d4982b" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {t("home.bookTable", "BOOK A TABLE")}
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<RestaurantMenuIcon />}
            onClick={() => navigate("/menu")}
            sx={{
              borderColor,
              color: primaryText,
              fontWeight: 700,
              px: 4,
              py: 1.6,
              borderRadius: 3,
              fontSize: "1rem",
              "&:hover": {
                borderColor: "#E5A93C",
                backgroundColor: "rgba(229, 169, 60, 0.08)",
              },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {t("home.viewMenu", "EXPLORE MENU")}
          </Button>
        </Stack>

        <Grid container spacing={2} justifycontent="center" sx={{ opacity: 0.9 }}>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
              <StarIcon sx={{ color: "#E5A93C", fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 700, color: primaryText }}>
                {t("home.trustRating", "4.9 / 5 Rating")}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
              <FlashOnIcon sx={{ color: "#E5A93C", fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 700, color: primaryText }}>
                {t("home.trustWait", "Instant Pre-Order")}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
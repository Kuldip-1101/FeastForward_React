import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

//------------- MUI Icons--------------
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

//------------- Shared Currency Utility --------------
import { formatLocalizedPrice } from "../utils/formatCurrency";

function HeroSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        textAlign: "center",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "radial-gradient(circle, rgba(30,30,30,1) 0%, rgba(18,18,18,1) 100%)"
            : "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(250,249,246,1) 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/*--------------- Dynamic Translatable Headline --------------*/}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "800",
            mb: 3,
            fontSize: { xs: "2.2rem", sm: "3rem", md: "3.8rem" },
            color: "text.primary",
          }}
        >
          {t("welcome")}
        </Typography>

        {/*--------------- Dynamic Sub-Headline --------------*/}
        <Typography
          variant="h5"
          sx={{
            color: "text.secondary",
            mb: 5,
            fontWeight: 400,
            lineHeight: 1.6,
            fontSize: { xs: "1.1rem", md: "1.4rem" },
          }}
        >
          {t("subWelcome")}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "primary.main",
            mb: 4,
            fontWeight: "600",
            letterSpacing: 1,
          }}
        >
          {t("buffetFrom")} {formatLocalizedPrice(450, 1, currentLang)}
        </Typography>

        {/*--------------- Action Buttons Stack ----------------*/}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
          }}
        >
          {/* Book Table Button -> /book-table */}
          <Button
            component={Link}
            to="/book-table"
            variant="contained"
            size="large"
            startIcon={<CalendarMonthIcon />}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              color: "#ffffff",
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "#B3922E" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {t("bookTable")}
          </Button>

          {/* View Menu Button -> /menu */}
          <Button
            component={Link}
            to="/menu"
            variant="outlined"
            size="large"
            color="primary"
            startIcon={<RestaurantMenuIcon />}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              borderWidth: 2,
              "&:hover": { borderWidth: 2 },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {t("viewMenu")}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default HeroSection;

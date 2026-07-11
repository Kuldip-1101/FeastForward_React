import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

//------------- MUI Icons--------------
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function HeroSection() {
  const { t } = useTranslation();
  const currentLang = useSelector((state) => state.locale.currentLang);
  const currentCurrency = useSelector((state) => state.locale.currency);

  //------------- Helper currency engine to show localized layout values --------------
  const formatSamplePrice = (amount) => {
    const localeMapping = {
      en: "en-US",
      gu: "en-IN",
      hi: "hi-IN",
      pa: "pa-IN",
      fr: "fr-FR",
      es: "es-ES",
    };
    return new Intl.NumberFormat(localeMapping[currentLang] || "en-US", {
      style: "currency",
      currency: currentCurrency,
    }).format(amount);
  };

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
      <Container maxWidth="md">
        {/*--------------- Dynamic Translatable Headline --------------*/}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "800",
            mb: 3,
            fontSize: { xs: "2.5rem", md: "4rem" },
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
          {t("buffetFrom")}
          {formatSamplePrice(450)}
        </Typography>

        {/*--------------- Action Buttons Stack ----------------*/}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            justifyContent: "center", // Centers horizontally
            alignItems: "center", // Centers vertically on mobile stack
            mt: 4,
          }}
        >
          <Button
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
              width: { xs: "100%", sm: "auto" }, // Full width on mobile, normal on desktop
            }}
          >
            {t("bookTable")}
          </Button>

          <Button
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

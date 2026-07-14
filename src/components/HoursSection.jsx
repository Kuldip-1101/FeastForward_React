import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid"; // Using modern responsive Grid layout
import { useTranslation } from "react-i18next";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function HoursSection() {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 5,
          color: "text.primary",
          letterSpacing: "0.02em",
        }}
      >
        {t("hoursTitle")}
      </Typography>

      <Grid
        container
        spacing={6}
        size={{ xs: 12, sm: 6, md: 5 }}
        sx={{ justifyContent: "center" }}
      >
        {/*------------- Weekday Schedule Card -----------------*/}
        <Card
          sx={{
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            height: "100%",
          }}
        >
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <AccessTimeIcon
              sx={{ color: "primary.main", fontSize: 40, mb: 2 }}
            />
            <Typography variant="h5" sx={{ fontWeight: "600", mb: 2 }}>
              {t("weekday")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t("lunch")}: **11:00 AM - 3:30 PM**
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              {t("dinner")}: **6:30 PM - 11:00 PM**
            </Typography>
          </CardContent>
        </Card>

        {/*------------- Weekend Schedule Card -----------------*/}
        <Card
          sx={{
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            height: "100%",
          }}
        >
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <AccessTimeIcon
              sx={{ color: "primary.main", fontSize: 40, mb: 2 }}
            />
            <Typography variant="h5" sx={{ fontWeight: "600", mb: 2 }}>
              {t("weekend")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t("lunch")}: **11:30 AM - 4:00 PM**
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              {t("dinner")}: **6:00 PM - 11:30 PM**
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}

export default HoursSection;

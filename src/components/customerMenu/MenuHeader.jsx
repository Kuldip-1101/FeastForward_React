import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function MenuHeader() {
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 4, textAlign: "center" }}>
      <Typography
        variant="h3"
        sx={{ fontWeight: 800, mb: 1, letterSpacing: "-0.5px" }}
      >
        {t("customerMenu.heading")}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {t("customerMenu.subheading")}
      </Typography>
    </Box>
  );
}
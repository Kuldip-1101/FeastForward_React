import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function MenuError() {
  const { t } = useTranslation();

  return (
    <Container sx={{ mt: 8, textAlign: "center" }}>
      <Typography color="error" variant="h6">
        {t("customerMenu.syncError")}
      </Typography>
    </Container>
  );
}
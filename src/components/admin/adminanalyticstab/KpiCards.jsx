import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { GET_KPI_CARDS_CONFIG } from "../../../constants/adminAnalyticsConstant";

export default function KpiCards({
  analyticsData,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
}) {
  const { t } = useTranslation();
  const kpis = GET_KPI_CARDS_CONFIG(analyticsData, t);

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {kpis.map((card, idx) => {
        const { IconComponent } = card;
        return (
          <Grid key={idx} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                backgroundColor: cardBg,
                color: primaryText,
                borderRadius: 3,
                border: `1px solid ${borderColor}`,
                textAlign: "center",
                py: 2,
                height: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="caption"
                  sx={{
                    color: secondaryText,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, my: 1, color: primaryText }}
                >
                  {card.val}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: card.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconComponent sx={{ color: card.iconColor }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
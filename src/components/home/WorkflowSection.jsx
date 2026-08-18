import React from "react";
import { Container, Box, Typography, Grid, Paper, Avatar } from "@mui/material";
import { WORKFLOW_STEPS } from "../../constants/HomeConstants";

export default function WorkflowSection({ t, isDark, cardBg, borderColor, primaryText, secondaryText }) {
  return (
    <Box
      sx={{
        backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
        py: 10,
        mb: 10,
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="overline" sx={{ color: "#E5A93C", fontWeight: 800, letterSpacing: 1.5 }}>
            {t("home.workflowTag", "SEAMLESS DINING EXPERIENCE")}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: primaryText, mt: 0.5 }}>
            {t("home.workflowTitle", "How FeastForward Works")}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {WORKFLOW_STEPS.map((item, idx) => {
            const StepIcon = item.icon;
            return (
              <Grid key={idx} size={{ xs: 12, md: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    backgroundColor: cardBg,
                    borderRadius: 4,
                    border: `1px solid ${borderColor}`,
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Avatar
                      sx={{
                        backgroundColor: "rgba(229, 169, 60, 0.15)",
                        color: "#E5A93C",
                        width: 52,
                        height: 52,
                      }}
                    >
                      <StepIcon />
                    </Avatar>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: secondaryText, opacity: 0.3 }}>
                      {item.step}
                    </Typography>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: primaryText }}>
                    {t(item.titleKey, item.defaultTitle)}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {t(item.descKey, item.defaultDesc)}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
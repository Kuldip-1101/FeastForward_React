import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, Card, Typography, Box } from "@mui/material";
import { ChartsContainer, BarPlot, LinePlot, MarkPlot, ChartsXAxis, ChartsYAxis, ChartsTooltip } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";
import { CATEGORY_CHART_COLORS } from "../../constants/adminAnalyticsConstant";

export default function AnalyticsCharts({
  timeSeriesData,
  categoryPieData,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
}) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {/*------------------ Trend Bar + Line Chart ------------------------*/}
      <Grid item size={{ xs: 12, sm: 12, md: 6 }}>
        <Card
          sx={{
            backgroundColor: cardBg,
            color: primaryText,
            borderRadius: 3,
            p: 2,
            border: `1px solid ${borderColor}`,
            height: "100%",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            {t("admin.analyticsTab.charts.trendTitle")}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t("admin.analyticsTab.charts.trendSubtitle")}
          </Typography>

          <Box sx={{ width: "100%", height: 300 }}>
            {timeSeriesData.length > 0 ? (
              <ChartsContainer
                series={[
                  {
                    type: "bar",
                    data: timeSeriesData.map((d) => d.bookings),
                    yAxisId: "leftAxis",
                    color: "#E5A93C",
                    label: t("admin.analyticsTab.charts.bookingsSeries"),
                  },
                  {
                    type: "line",
                    data: timeSeriesData.map((d) => d.revenueNumeric),
                    yAxisId: "rightAxis",
                    color: "#42A5F5",
                    label: t("admin.analyticsTab.charts.revenueSeries"),
                  },
                ]}
                xAxis={[
                  {
                    data: timeSeriesData.map((d) => d.date),
                    scaleType: "band",
                    id: "x-axis",
                  },
                ]}
                yAxis={[
                  { id: "leftAxis", position: "left" },
                  { id: "rightAxis", position: "right" },
                ]}
              >
                <BarPlot />
                <LinePlot />
                <MarkPlot />
                <ChartsXAxis axisId="x-axis" tickLabelStyle={{ fill: secondaryText }} />
                <ChartsYAxis axisId="leftAxis" tickLabelStyle={{ fill: secondaryText }} />
                <ChartsTooltip />
              </ChartsContainer>
            ) : (
              <Box sx={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center" }}>
                <Typography color="text.secondary">
                  {t("admin.analyticsTab.charts.noTrendData")}
                </Typography>
              </Box>
            )}
          </Box>
        </Card>
      </Grid>

      {/*------------------ Category Pie Chart ------------------------*/}
      <Grid item size={{ xs: 12, sm: 12, md: 6 }}>
        <Card
          sx={{
            backgroundColor: cardBg,
            color: primaryText,
            borderRadius: 3,
            p: 2,
            border: `1px solid ${borderColor}`,
            height: "100%",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            {t("admin.analyticsTab.charts.categoryTitle")}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t("admin.analyticsTab.charts.categorySubtitle")}
          </Typography>

          <Box sx={{ width: "100%", height: 300 }}>
            {categoryPieData.length > 0 ? (
              <PieChart
                series={[
                  {
                    data: categoryPieData,
                    innerRadius: 50,
                    outerRadius: 90,
                    paddingAngle: 2,
                    cornerRadius: 4,
                  },
                ]}
                colors={CATEGORY_CHART_COLORS}
                slotProps={{
                  legend: {
                    direction: "column",
                    position: { vertical: "middle", horizontal: "right" },
                    labelstyle: { fill: primaryText, fontSize: 12 },
                  },
                }}
              />
            ) : (
              <Box sx={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center" }}>
                <Typography color="text.secondary">
                  {t("admin.analyticsTab.charts.noCategoryData")}
                </Typography>
              </Box>
            )}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
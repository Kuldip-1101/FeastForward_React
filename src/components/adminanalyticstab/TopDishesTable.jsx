import React from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  useTheme,
} from "@mui/material";

export default function TopDishesTable({
  topMenuItems,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  currentLang,
}) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundColor: cardBg,
        color: primaryText,
        borderRadius: 3,
        border: `1px solid ${borderColor}`,
      }}
    >
      <Box sx={{ p: 3, borderBottom: `1px solid ${borderColor}` }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {t("admin.analyticsTab.tables.topDishesTitle")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("admin.analyticsTab.tables.topDishesSubtitle")}
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ borderBottom: `1px solid ${borderColor}` }}>
              <TableCell sx={{ color: secondaryText, fontWeight: 700 }}>
                {t("admin.analyticsTab.tables.colItemName")}
              </TableCell>
              <TableCell sx={{ color: secondaryText, fontWeight: 700 }}>
                {t("admin.analyticsTab.tables.colCategory")}
              </TableCell>
              <TableCell sx={{ color: secondaryText, fontWeight: 700 }} align="center">
                {t("admin.analyticsTab.tables.colOrdersSold")}
              </TableCell>
              <TableCell sx={{ color: secondaryText, fontWeight: 700 }} align="right">
                {t("admin.analyticsTab.tables.colTotalRevenue")}
              </TableCell>
              <TableCell sx={{ color: secondaryText, fontWeight: 700 }} align="center">
                {t("admin.analyticsTab.tables.colStockStatus")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topMenuItems.length > 0 ? (
              topMenuItems.map((row) => {
                const itemName =
                  typeof row.rawName === "string"
                    ? row.rawName
                    : row.rawName?.[currentLang] || row.rawName?.en || "Item";

                const categoryTranslated = t(
                  `customerMenu.categories.${row.category}`,
                  row.category
                );

                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      borderBottom: `1px solid ${borderColor}`,
                      "&:hover": { backgroundColor: theme.palette.action.hover },
                    }}
                  >
                    <TableCell sx={{ color: primaryText, fontWeight: 600 }}>
                      {itemName}
                    </TableCell>
                    <TableCell sx={{ color: secondaryText }}>
                      {categoryTranslated}
                    </TableCell>
                    <TableCell sx={{ color: primaryText }} align="center">
                      {row.ordersCount}
                    </TableCell>
                    <TableCell sx={{ color: "#E5A93C", fontWeight: 700 }} align="right">
                      {row.formattedRevenue}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={
                          row.isAvailable
                            ? t("admin.analyticsTab.tables.inStock")
                            : t("admin.analyticsTab.tables.outOfStock")
                        }
                        size="small"
                        sx={{
                          backgroundColor: row.isAvailable
                            ? "rgba(102, 187, 106, 0.2)"
                            : "rgba(239, 83, 80, 0.2)",
                          color: row.isAvailable ? "#66BB6A" : "#EF5350",
                          fontWeight: 700,
                          borderRadius: "6px",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ color: secondaryText, py: 4 }}>
                  {t("admin.analyticsTab.tables.noDishes")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutlineOutlined";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  formatLocalizedPrice,
  formatTotalCartPrice,
} from "../utils/formatCurrency";

export default function BookingCard({
  booking,
  isDark,
  theme,
  t,
  i18n,
  getItemName,
  onSelectCancel,
}) {
  const bookingDateTime = new Date(`${booking.date}T23:59:59`);
  const isUpcoming = bookingDateTime >= new Date();

  //=----------------- Calculate Total Pre-Order Amount(INR) -----------------
  const totalInrAmount =
    booking.totalPreOrderAmount ||
    (booking.preOrders || []).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

  return (
    <Card
      elevation={isDark ? 0 : 2}
      sx={{
        width: "100%",
        borderRadius: "24px",
        bgcolor: isDark ? "#323538" : "#ffffff",
        color: "text.primary",
        boxSizing: "border-box",
        border: isDark ? "none" : `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent
        sx={{
          p: { xs: 3, sm: 4 },
          "&:last-child": { pb: { xs: 3, sm: 4 } },
        }}
      >
        {/*---------------- Table Details & Status -------------------*/}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight="800"
              sx={{
                color: isDark ? "#e5a93c" : "#b37b12",
                fontSize: "1.4rem",
                mb: 0.5,
              }}
            >
              {booking.tableDetails ||
                booking.tableName ||
                t("myBookings.reservedTable") ||
                "Reserved Table"}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {t("myBookings.bookingRef")}: #{booking.bookingId || booking.id}
            </Typography>
          </Box>

          <Chip
            label={
              isUpcoming
                ? t("myBookings.statusUpcoming") || "Upcoming"
                : t("myBookings.statusCompleted") || "Completed"
            }
            sx={{
              bgcolor: isUpcoming
                ? "#e5a93c"
                : isDark
                ? "#4a4a4a"
                : "#e0e0e0",
              color: isUpcoming ? "#000000" : isDark ? "#ffffff" : "#000000",
              fontWeight: "700",
              fontSize: "0.85rem",
              height: 32,
              borderRadius: "16px",
              px: 1,
            }}
          />
        </Box>

        <Divider
          sx={{
            my: 2.5,
            borderColor: isDark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.08)",
          }}
        />

        {/*---------------- Date, Time, Guests Details -------------------*/}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            gap: { xs: 3, sm: 6 },
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalendarTodayIcon sx={{ fontSize: 18, color: "text.primary" }} />
            <Typography
              variant="body1"
              fontWeight="600"
              sx={{ color: "text.primary" }}
            >
              {booking.date}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTimeIcon sx={{ fontSize: 18, color: "text.primary" }} />
            <Typography
              variant="body1"
              fontWeight="600"
              sx={{ color: "text.primary" }}
            >
              {booking.timeSlot}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PeopleOutlineIcon sx={{ fontSize: 20, color: "text.primary" }} />
            <Typography
              variant="body1"
              fontWeight="600"
              sx={{ color: "text.primary" }}
            >
              {t("myBookings.guestsCount", { count: booking.guestCount }) ||
                          `${booking.guestCount} Guests`}
            </Typography>
          </Box>
        </Box>

        {/*---------------- Special Requests -------------------*/}
        {booking.specialRequests && (
          <Box
            sx={{
              mb: 2.5,
              p: 2,
              bgcolor: isDark ? "#222426" : "#f5f5f5",
              borderRadius: "12px",
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block", mb: 0.5 }}
            >
              {t("myBookings.specialRequests") || "Special Requests"}:
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.primary", fontStyle: "italic" }}
            >
              "{booking.specialRequests}"
            </Typography>
          </Box>
        )}

        {/*---------------- Pre-Orders Block -------------------*/}
        {booking.preOrders && booking.preOrders.length > 0 && (
          <Box
            sx={{
              bgcolor: isDark ? "#222426" : "#f9f9f9",
              borderRadius: "16px",
              p: 3,
              mt: 2,
              border: isDark ? "none" : "1px solid #eee",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <RestaurantIcon
                sx={{ fontSize: 18, color: isDark ? "#e5a93c" : "#b37b12" }}
              />
              <Typography
                variant="subtitle1"
                fontWeight="700"
                sx={{ color: "text.primary" }}
              >
                {t("myBookings.preOrderTitle") || "Pre-Ordered Dishes"}
              </Typography>
            </Box>

            {booking.preOrders.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 0.8,
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight="600"
                  sx={{ color: "text.primary" }}
                >
                  {getItemName(item.name)} × {item.quantity}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="700"
                  sx={{ color: "text.primary" }}
                >
                  {formatLocalizedPrice(
                    item.price,
                    item.quantity,
                    i18n.language
                  )}
                </Typography>
              </Box>
            ))}

            <Divider
              sx={{
                my: 2,
                borderColor: isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.08)",
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                fontWeight="700"
                sx={{ color: "text.primary" }}
              >
                {t("myBookings.totalPreOrderAmount")}:
              </Typography>
              <Typography
                variant="body1"
                fontWeight="800"
                sx={{ color: "text.primary" }}
              >
                {formatTotalCartPrice(
                  booking.preOrders,
                  totalInrAmount,
                  i18n.language
                )}
              </Typography>
            </Box>
          </Box>
        )}

        {/*---------------- Cancel Button -------------------*/}
        {isUpcoming && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
              color="error"
              size="medium"
              startIcon={<DeleteIcon />}
              onClick={() => onSelectCancel(booking)}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                borderColor: "#ff5252",
                color: "#ff5252",
                fontWeight: "600",
                px: 2.5,
                "&:hover": {
                  borderColor: "#ff1744",
                  bgcolor: "rgba(255, 82, 82, 0.1)",
                },
              }}
            >
              {t("myBookings.cancelReservationBtn") || "Cancel Reservation"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
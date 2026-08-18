import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { Container, Box, CircularProgress, Alert } from "@mui/material";

import AnalyticsHeader from "../../components/admin/adminanalyticstab/AnalyticsHeader";
import KpiCards from "../../components/admin/adminanalyticstab/KpiCards";
import AnalyticsCharts from "../../components/admin/adminanalyticstab/AnalyticsCharts";
import TopDishesTable from "../../components/admin/adminanalyticstab/TopDishesTable";

import {
  formatLocalizedPrice,
  formatTotalCartPrice,
} from "../../utils/formatCurrency";
import PageSEO from "../../components/common/PageSEO";

export default function AdminAnalyticsTab() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const [periodFilter, setPeriodFilter] = useState("all");

  //--------------------- Fetch Bookings Data----------------------
  const {
    data: bookings = [],
    isLoading: isBookingsLoading,
    isError: isBookingsError,
  } = useQuery({
    queryKey: ["analyticsBookings"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/bookings`);
      if (!res.ok) throw new Error("Failed to fetch bookings.");
      return res.json();
    },
  });

  //--------------------- Fetch Menu Data----------------------
  const {
    data: menuItems = [],
    isLoading: isMenuLoading,
    isError: isMenuError,
  } = useQuery({
    queryKey: ["analyticsMenu"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/menu`);
      if (!res.ok) throw new Error("Failed to fetch menu items.");
      return res.json();
    },
  });

  //--------------------- Menu lookup map----------------------
  const menuLookup = useMemo(() => {
    const map = new Map();
    menuItems.forEach((item) => {
      map.set(String(item.id), item);
      if (item.name) {
        if (typeof item.name === "string") map.set(item.name, item);
        else if (item.name.en) map.set(item.name.en, item);
      }
    });
    return map;
  }, [menuItems]);

  //------------------ Filter Bookings by Selected Period---------------
  const filteredBookings = useMemo(() => {
    if (!bookings.length) return [];
    if (periodFilter === "all") return bookings;

    const now = new Date();
    return bookings.filter((b) => {
      if (!b.date) return true;
      const bDate = new Date(b.date);
      const diffDays = (now - bDate) / (1000 * 60 * 60 * 24);

      if (periodFilter === "day") return diffDays <= 1;
      if (periodFilter === "week") return diffDays <= 7;
      if (periodFilter === "month") return diffDays <= 30;
      if (periodFilter === "year") return diffDays <= 365;
      return true;
    });
  }, [bookings, periodFilter]);

  //-------------------- Aggregation & Revenue Logic ----------------------
  const analyticsData = useMemo(() => {
    let totalGuests = 0;
    let totalPreOrdersCount = 0;
    const allCartItems = [];
    const itemStatsMap = new Map();

    filteredBookings.forEach((booking) => {
      const guests = Number(booking.guests || booking.guestCount || 0);
      totalGuests += guests;

      const preOrders = booking.preOrders || booking.cartItems || [];
      if (preOrders.length > 0) totalPreOrdersCount += 1;

      preOrders.forEach((po) => {
        const qty = Number(po.quantity || po.qty || 1);
        const matchedItem =
          menuLookup.get(String(po.id)) || menuLookup.get(po.name) || po;
        const priceInr = Number(matchedItem.price || po.price || 0);

        allCartItems.push({ price: priceInr, quantity: qty });

        const key = String(matchedItem.id || po.name || po.id);
        if (!itemStatsMap.has(key)) {
          itemStatsMap.set(key, {
            id: key,
            rawName: matchedItem.name || po.name,
            category: matchedItem.category || po.category || "Main Course",
            ordersCount: 0,
            revenueINR: 0,
            itemsList: [],
            isAvailable:
              matchedItem.isAvailable !== undefined
                ? matchedItem.isAvailable
                : true,
          });
        }

        const stat = itemStatsMap.get(key);
        stat.ordersCount += qty;
        stat.revenueINR += priceInr * qty;
        stat.itemsList.push({ price: priceInr, quantity: qty });
      });
    });

    const totalInr = allCartItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0,
    );
    const totalRevenueFormatted = formatTotalCartPrice(
      allCartItems,
      totalInr,
      currentLang,
    );
    const avgSpendInr =
      totalGuests > 0 ? Math.round(totalInr / totalGuests) : 0;
    const avgSpendFormatted = formatLocalizedPrice(avgSpendInr, 1, currentLang);

    const conversionRate =
      filteredBookings.length > 0
        ? Math.round((totalPreOrdersCount / filteredBookings.length) * 100)
        : 0;

    const topMenuItems = Array.from(itemStatsMap.values())
      .sort((a, b) => b.ordersCount - a.ordersCount)
      .slice(0, 5)
      .map((item) => ({
        ...item,
        formattedRevenue: formatTotalCartPrice(
          item.itemsList,
          item.revenueINR,
          currentLang,
        ),
      }));

    const categoryMap = {};
    Array.from(itemStatsMap.values()).forEach((stat) => {
      const cat = stat.category || "Other";
      if (!categoryMap[cat]) categoryMap[cat] = { items: [], totalInr: 0 };
      categoryMap[cat].items.push(...stat.itemsList);
      categoryMap[cat].totalInr += stat.revenueINR;
    });

    const categoryPieData = Object.entries(categoryMap).map(
      ([cat, data], idx) => {
        const numericVal = ["hi", "gu", "pa"].includes(currentLang)
          ? data.totalInr
          : data.items.reduce(
              (acc, i) => acc + Math.round(i.price / 85) * i.quantity,
              0,
            );

        return {
          id: idx,
          value: numericVal,
          label: `${t(`customerMenu.categories.${cat}`, cat)} (${formatTotalCartPrice(data.items, data.totalInr, currentLang)})`,
        };
      },
    );

    const dateMap = {};
    filteredBookings.forEach((b) => {
      const dateStr = b.date
        ? new Date(b.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : "Unknown";

      if (!dateMap[dateStr])
        dateMap[dateStr] = {
          date: dateStr,
          bookings: 0,
          revenueINR: 0,
          items: [],
        };
      dateMap[dateStr].bookings += 1;

      const preOrders = b.preOrders || b.cartItems || [];
      preOrders.forEach((po) => {
        const qty = Number(po.quantity || po.qty || 1);
        const matchedItem =
          menuLookup.get(String(po.id)) || menuLookup.get(po.name) || po;
        const priceInr = Number(matchedItem.price || po.price || 0);

        dateMap[dateStr].revenueINR += priceInr * qty;
        dateMap[dateStr].items.push({ price: priceInr, quantity: qty });
      });
    });

    const timeSeriesData = Object.values(dateMap).map((d) => ({
      date: d.date,
      bookings: d.bookings,
      revenueNumeric: ["hi", "gu", "pa"].includes(currentLang)
        ? d.revenueINR
        : d.items.reduce(
            (acc, i) => acc + Math.round(i.price / 85) * i.quantity,
            0,
          ),
    }));

    return {
      totalRevenueFormatted,
      totalGuests,
      avgSpendFormatted,
      conversionRate,
      topMenuItems,
      categoryPieData,
      timeSeriesData,
    };
  }, [filteredBookings, menuLookup, currentLang, t]);

  if (isBookingsLoading || isMenuLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress color="warning" />
      </Box>
    );
  }

  if (isBookingsError || isMenuError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{t("admin.analyticsTab.error")}</Alert>
      </Container>
    );
  }

  //----------------- Theme Tokens---------------------
  const cardBg = theme.palette.background.paper;
  const borderColor = theme.palette.divider;
  const primaryText = theme.palette.text.primary;
  const secondaryText = theme.palette.text.secondary;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>

      <PageSEO
        title={t(
          "seo.adminAnalyticsTitle",
          "Analytics & Reports | FeastForward Admin",
        )}
        description={t(
          "seo.adminAnalyticsDesc",
          "Analyze revenue trends, booking metrics, and dish performance.",
        )}
      />

      <AnalyticsHeader
        periodFilter={periodFilter}
        onPeriodChange={setPeriodFilter}
        cardBg={cardBg}
        borderColor={borderColor}
        primaryText={primaryText}
        secondaryText={secondaryText}
        theme={theme}
      />

      <KpiCards
        analyticsData={analyticsData}
        cardBg={cardBg}
        borderColor={borderColor}
        primaryText={primaryText}
        secondaryText={secondaryText}
      />

      <AnalyticsCharts
        timeSeriesData={analyticsData.timeSeriesData}
        categoryPieData={analyticsData.categoryPieData}
        cardBg={cardBg}
        borderColor={borderColor}
        primaryText={primaryText}
        secondaryText={secondaryText}
      />

      <TopDishesTable
        topMenuItems={analyticsData.topMenuItems}
        cardBg={cardBg}
        borderColor={borderColor}
        primaryText={primaryText}
        secondaryText={secondaryText}
        currentLang={currentLang}
      />
    </Container>
  );
}

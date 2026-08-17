import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

//------------------- Sub-components--------------------
import HeroSection from "../components/home/HeroSection";
import FeaturedDishesSection from "../components/home/FeaturedDishesSection";
import WorkflowSection from "../components/home/WorkflowSection";
import OperatingHoursSection from "../components/home/OperatingHoursSection";
import CtaBannerSection from "../components/home/CtaBannerSection";
import PageSEO from "../components/common/PageSEO";

export default function Home() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language || "en";

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  //----------------------- Dynamic Theme Values-----------------------
  const cardBg = theme.palette.background.paper;
  const pageBg = theme.palette.background.default;
  const borderColor = theme.palette.divider;
  const primaryText = theme.palette.text.primary;
  const secondaryText = theme.palette.text.secondary;
  const isDark = theme.palette.mode === "dark";

  //----------------------- Fetch Menu from JSON Server-----------------------
  const {
    data: menuItems = [],
    isLoading: isMenuLoading,
    isError: isMenuError,
  } = useQuery({
    queryKey: ["homeFeaturedMenu"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/menu`);
      if (!res.ok) throw new Error("Failed to fetch menu.");
      return res.json();
    },
  });

  //----------------------- Filter 3 Top Featured Items-----------------------
  const featuredDishes = useMemo(() => {
    if (!menuItems.length) return [];
    const filtered = menuItems.filter((item) => item.isFeatured || item.isAvailable);
    return (filtered.length ? filtered : menuItems).slice(0, 3);
  }, [menuItems]);

  return (
    <Box sx={{ backgroundColor: pageBg, color: primaryText, minHeight: "100vh", pb: 8 }}>

      <PageSEO 
        title={t('seo.homeTitle', 'Home  |  FeastForward')} 
        description={t('seo.homeDesc', 'Book your table and pre-order gourmet meals effortlessly.')} 
      />

      <HeroSection
        t={t}
        navigate={navigate}
        isDark={isDark}
        primaryText={primaryText}
        secondaryText={secondaryText}
        borderColor={borderColor}
      />

      <FeaturedDishesSection
        t={t}
        navigate={navigate}
        currentLang={currentLang}
        featuredDishes={featuredDishes}
        isLoading={isMenuLoading}
        isError={isMenuError}
        cardBg={cardBg}
        borderColor={borderColor}
        primaryText={primaryText}
        isDark={isDark}
      />

      <WorkflowSection
        t={t}
        isDark={isDark}
        cardBg={cardBg}
        borderColor={borderColor}
        primaryText={primaryText}
        secondaryText={secondaryText}
      />

      <OperatingHoursSection
        t={t}
        cardBg={cardBg}
        borderColor={borderColor}
        primaryText={primaryText}
        isDark={isDark}
      />

      <CtaBannerSection t={t} navigate={navigate} />
    </Box>
  );
}
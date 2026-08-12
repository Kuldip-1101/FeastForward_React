import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PeopleIcon from "@mui/icons-material/People";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const PERIOD_FILTERS = [
  { value: "all", labelKey: "admin.analyticsTab.filters.all" },
  { value: "day", labelKey: "admin.analyticsTab.filters.day" },
  { value: "week", labelKey: "admin.analyticsTab.filters.week" },
  { value: "month", labelKey: "admin.analyticsTab.filters.month" },
  { value: "year", labelKey: "admin.analyticsTab.filters.year" },
];

export const GET_KPI_CARDS_CONFIG = (analyticsData, t) => [
  {
    title: t("admin.analyticsTab.kpis.revenue"),
    val: analyticsData.totalRevenueFormatted,
    IconComponent: AccountBalanceWalletIcon,
    iconColor: "#E5A93C",
    bg: "rgba(229, 169, 60, 0.15)",
  },
  {
    title: t("admin.analyticsTab.kpis.guests"),
    val: analyticsData.totalGuests,
    IconComponent: PeopleIcon,
    iconColor: "#42A5F5",
    bg: "rgba(66, 165, 245, 0.15)",
  },
  {
    title: t("admin.analyticsTab.kpis.avgSpend"),
    val: analyticsData.avgSpendFormatted,
    IconComponent: DynamicFeedIcon,
    iconColor: "#66BB6A",
    bg: "rgba(102, 187, 106, 0.15)",
  },
  {
    title: t("admin.analyticsTab.kpis.conversion"),
    val: `${analyticsData.conversionRate}%`,
    IconComponent: ShoppingCartIcon,
    iconColor: "#EF5350",
    bg: "rgba(239, 83, 80, 0.15)",
  },
];

export const CATEGORY_CHART_COLORS = [
  "#E5A93C",
  "#42A5F5",
  "#66BB6A",
  "#AB47BC",
  "#FF7043",
];
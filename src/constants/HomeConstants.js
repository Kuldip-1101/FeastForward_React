import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";

export const WORKFLOW_STEPS = [
  {
    step: "01",
    titleKey: "home.workflow.step1Title",
    defaultTitle: "Book Your Table",
    descKey: "home.workflow.step1Desc",
    defaultDesc: "Select your preferred date, time, and party size effortlessly.",
    icon: CalendarMonthIcon,
  },
  {
    step: "02",
    titleKey: "home.workflow.step2Title",
    defaultTitle: "Pre-Order Meals",
    descKey: "home.workflow.step2Desc",
    defaultDesc: "Choose your favorite dishes beforehand to skip long waiting times.",
    icon: RestaurantMenuIcon,
  },
  {
    step: "03",
    titleKey: "home.workflow.step3Title",
    defaultTitle: "Arrive & Feast",
    descKey: "home.workflow.step3Desc",
    defaultDesc: "Walk in to a reserved table served with hot, fresh culinary creations.",
    icon: AutoAwesomeIcon,
  },
];

export const HIGHLIGHTS = [
  {
    icon: FlashOnIcon,
    title: "Zero Waiting Time",
    desc: "Pre-ordered dishes are prepared precisely to coincide with your arrival.",
  },
  {
    icon: OutdoorGrillIcon,
    title: "Gourmet Culinary Art",
    desc: "Crafted by world-class chefs using locally sourced, organic ingredients.",
  },
  {
    icon: AutoAwesomeIcon,
    title: "Custom Ambiance",
    desc: "Choose between luxurious private dining, outdoor patio, or main lounge.",
  },
];

export const DEFAULT_DISH_IMAGE =
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80";
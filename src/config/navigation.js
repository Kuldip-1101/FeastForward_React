import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export const NAV_LINKS = [
  {
    path: "/",
    translationKey: "navHome",
    fallbackLabel: "Home",
    icon: HomeIcon,
  },
  {
    path: "/menu",
    translationKey: "navMenu",
    fallbackLabel: "Menu",
    icon: RestaurantMenuIcon,
  },
  {
    path: "/book-table",
    translationKey: "bookTable",
    fallbackLabel: "Book Table",
    icon: TableRestaurantIcon,
  },
  {
    path: "/my-bookings",
    translationKey: "myBookings.title", // translation key or fallback label
    fallbackLabel: "My Bookings",
    icon: BookmarkBorderIcon,
  },
];
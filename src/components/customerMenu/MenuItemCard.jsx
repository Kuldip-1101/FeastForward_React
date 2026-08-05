import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BlockIcon from "@mui/icons-material/Block";
import { useTranslation } from "react-i18next";
import { formatLocalizedPrice } from "../../utils/formatCurrency";

export default function MenuItemCard({ item, currentLang, onPreOrder }) {
  const { t } = useTranslation();

  const isAvailable = item.isAvailable ?? true;

  const getItemTitle = () => {
    if (typeof item.name === "string") return item.name;
    return (
      item.name?.[currentLang] ||
      item.name?.en ||
      t("customerMenu.defaultItemName")
    );
  };

  const itemTitle = getItemTitle();

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: isAvailable ? 1 : 0.65,
          filter: isAvailable ? "none" : "grayscale(30%)",
          "&:hover": isAvailable ? { transform: "translateY(-6px)" } : {},
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="220"
            image={item.image}
            alt={itemTitle}
            sx={{ objectFit: "cover" }}
          />
          {!isAvailable && (
            <Chip
              label={t("customerMenu.outOfStock")}
              color="error"
              size="small"
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.5px",
              }}
            />
          )}
        </Box>

        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{ fontWeight: 700, pr: 1 }}
            >
              {itemTitle}
            </Typography>

            {item.category && (
              <Typography
                variant="caption"
                sx={{
                  px: 1.5,
                  py: 0.5,
                  bgcolor: "action.hover",
                  borderRadius: 1.5,
                  fontWeight: 600,
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {t(`customerMenu.categories.${item.category}`, item.category)}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
              pt: 2,
            }}
          >
            <Typography
              variant="h6"
              color={isAvailable ? "primary.main" : "text.disabled"}
              sx={{ fontWeight: 800 }}
            >
              {formatLocalizedPrice(item.price, 1, currentLang)}
            </Typography>

            <Button
              variant="contained"
              size="small"
              disabled={!isAvailable}
              startIcon={
                isAvailable ? <AddShoppingCartIcon /> : <BlockIcon />
              }
              onClick={() => onPreOrder(item, itemTitle)}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                px: { xs: 1, sm: 2 },
              }}
            >
              {isAvailable
                ? t("customerMenu.addToPreOrder")
                : t("customerMenu.unavailable")}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
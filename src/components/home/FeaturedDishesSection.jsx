import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Skeleton,
  Button,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { formatLocalizedPrice } from "../../utils/formatCurrency";
import { DEFAULT_DISH_IMAGE } from "../../constants/HomeConstants";

export default function FeaturedDishesSection({
  t,
  navigate,
  currentLang,
  featuredDishes,
  isLoading,
  isError,
  cardBg,
  borderColor,
  primaryText,
  isDark,
}) {
  return (
    <Container maxWidth="lg" sx={{ mb: 10 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="overline" sx={{ color: "#E5A93C", fontWeight: 800, letterSpacing: 1.5 }}>
          {t("home.featuredTag", "CURATED SELECTIONS")}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: primaryText, mt: 0.5 }}>
          {t("home.featuredTitle", "Signature Chef Specials")}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {isLoading
          ? Array.from(new Array(3)).map((_, idx) => (
              <Grid key={idx} item size={{ xs: 12, sm: 6, md: 4 }}>
                <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 3, mb: 1 }} />
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="text" width="40%" height={20} />
              </Grid>
            ))
          : !isError &&
            featuredDishes.map((dish) => {
              const dishName =
                typeof dish.name === "string"
                  ? dish.name
                  : dish.name?.[currentLang] || dish.name?.en || "Signature Dish";

              const dishDesc =
                typeof dish.description === "string"
                  ? dish.description
                  : dish.description?.[currentLang] || dish.description?.en || "";

              return (
                <Grid key={dish.id} item size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    sx={{
                      backgroundColor: cardBg,
                      borderRadius: 4,
                      border: `1px solid ${borderColor}`,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: isDark ? "0 12px 24px rgba(0,0,0,0.5)" : "0 12px 24px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={dish.image || DEFAULT_DISH_IMAGE}
                        alt={dishName}
                      />
                      <Chip
                        label={dish.category || "Popular"}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          backgroundColor: "rgba(18, 18, 18, 0.75)",
                          backdropFilter: "blur(4px)",
                          color: "#E5A93C",
                          fontWeight: 700,
                        }}
                      />
                    </Box>

                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justify: "space-between",
                        p: 3,
                      }}
                    >
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: primaryText, mb: 1 }}>
                          {dishName}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            mb: 2,
                          }}
                        >
                          {dishDesc}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          pt: 2,
                          borderTop: `1px solid ${borderColor}`,
                        }}
                      >
                        <Typography variant="h6" sx={{ color: "#E5A93C", fontWeight: 800 }}>
                          {formatLocalizedPrice(dish.price || 0, 1, currentLang)}
                        </Typography>

                        <Button
                          size="small"
                          onClick={() => navigate("/menu")}
                          endIcon={<ArrowForwardIcon fontSize="small" />}
                          sx={{ color: primaryText, fontWeight: 700, "&:hover": { color: "#E5A93C" } }}
                        >
                          {t("home.preOrder", "Order")}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
      </Grid>
    </Container>
  );
}
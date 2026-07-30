import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCurrentCart } from "../hooks/useCurrentCart";
import AuthModal from "../components/navbar/AuthModal";
import { formatLocalizedPrice } from "../utils/formatCurrency";

function Menu() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  const { isAuthenticated } = useSelector((state) => state.auth);
  const [authOpen, setAuthOpen] = useState(false);

  // Hook provides active user / guest cart dispatchers automatically
  const { addItem } = useCurrentCart();

  //------------ TanStack Query engine ----------------
  const {
    data: menuItems,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["menuCatalog"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/menu");
      if (!response.ok)
        throw new Error("Failed to capture local database entry stream.");
      return response.json();
    },
  });

  const handlePreOrder = (item) => {
    if (!isAuthenticated) {
      setAuthOpen(true); //--------- Triggers auth modal directly from menu--------
      return;
    }
    addItem(item);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={50} color="primary" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          Unable to synchronize menu registry. Ensure JSON-Server endpoint is
          running.
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, mb: 1, letterSpacing: "-0.5px" }}
          >
            {t("menuHeading")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("menuSubheading")}
          </Typography>
        </Box>

        {/*------------ Fully responsive layout ------------*/}
        <Grid container spacing={4}>
          {menuItems?.map((item) => {
            //--------- Resolve translation key dynamically---------
            const itemTitle =
              typeof item.name === "string"
                ? item.name
                : item.name?.[currentLang] || item.name?.en || "Item";

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                    transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": { transform: "translateY(-6px)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image={item.image}
                    alt={itemTitle}
                    sx={{ objectFit: "cover" }}
                  />
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

                      {/*--------- Category Badge ----------*/}
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
                        {item.category}
                      </Typography>
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
                        color="primary.main"
                        sx={{ fontWeight: 800 }}
                      >
                        {formatLocalizedPrice(item.price, 1, currentLang)}
                      </Typography>

                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={() => handlePreOrder(item)}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          px: { xs: 1, sm: 2 },
                        }}
                      >
                        {t("addToPreOrder")}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/*----------- Auth Modal interceptor for logged-out users --------------*/}
      <AuthModal open={authOpen} handleClose={() => setAuthOpen(false)} />
    </>
  );
}

export default Menu;
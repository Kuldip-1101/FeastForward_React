import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  formatLocalizedPrice,
  formatTotalCartPrice,
} from "../../utils/formatCurrency";

export function PreOrderSummarySection({
  cartItems,
  totalCartAmount,
  currentLang,
}) {
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        {t("reservation.preOrderSummaryTitle")}
      </Typography>

      {cartItems.length === 0 ? (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          {t("reservation.noPreOrders")}
        </Alert>
      ) : (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
          <List disablePadding>
            {cartItems.map((item) => {
              const title =
                typeof item.name === "string"
                  ? item.name
                  : item.name?.[currentLang] || item.name?.en || "Item";

              return (
                <ListItem key={item.id} sx={{ px: 0, py: 0.5 }}>
                  <ListItemText primary={`${title} × ${item.quantity}`} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatLocalizedPrice(
                      item.price,
                      item.quantity,
                      currentLang,
                    )}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t("reservation.totalAmount")}:
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary.main"
              sx={{ fontWeight: 800 }}
            >
              {formatTotalCartPrice(cartItems, totalCartAmount, currentLang)}
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
}

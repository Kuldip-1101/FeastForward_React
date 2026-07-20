import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import { useTranslation } from "react-i18next";
import { useCurrentCart } from "../hooks/useCurrentCart";

const formatLocalizedPrice = (baseInrPrice, lang) => {
  if (["hi", "gu", "pa"].includes(lang)) {
    return `₹${baseInrPrice.toLocaleString()}`;
  }
  return `$${Math.round(baseInrPrice / 85)}`;
};

function CartDrawer({ open, onClose }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  // Hook handles active user / guest state & actions automatically
  const { cartItems, totalCartAmount, addItem, removeItem, resetCart, decrementItem } =
    useCurrentCart();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: 320, sm: 400 },
          p: 3,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/*------------ Header -----------------*/}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {t("cartTitle")}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        {/*----------- Itemized List --------------*/}
        <Box sx={{ flexGrow: 1, overflowY: "auto", my: 2 }}>
          {cartItems.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography color="text.secondary">{t("cartEmpty")}</Typography>
            </Box>
          ) : (
            <List disablePadding>
              {cartItems.map((item) => {
                const title =
                  typeof item.name === "string"
                    ? item.name
                    : item.name?.[currentLang] ||
                      item.name?.en ||
                      item.title ||
                      "Item";
                return (
                  <ListItem
                    key={item.id}
                    sx={{
                      px: 0,
                      py: 1.5,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={item.image}
                        variant="rounded"
                        sx={{ width: 56, height: 56, mr: 1.5 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 700 }}
                        >
                          {title}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          color="primary.main"
                          sx={{ fontWeight: 600, mt: 0.5 }}
                        >
                          {formatLocalizedPrice(
                            item.price * item.quantity,
                            currentLang,
                          )}
                        </Typography>
                      }
                    />
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <IconButton
                        size="small"
                        onClick={() => decrementItem(item.id)}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, px: 1 }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton size="small" onClick={() => addItem(item)}>
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Box>

        {/*----------- Footer Summary & Controls ---------------*/}
        {cartItems.length > 0 && (
          <Box sx={{ pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {t("cartTotal")}
              </Typography>
              <Typography
                variant="h6"
                color="primary.main"
                sx={{ fontWeight: 800 }}
              >
                {formatLocalizedPrice(totalCartAmount, currentLang)}
              </Typography>
            </Box>
            <Stack spacing={1.5}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ borderRadius: 2, fontWeight: 700 }}
              >
                {t("cartProceed")}
              </Button>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                startIcon={<DeleteOutlineIcon />}
                onClick={resetCart}
              >
                {t("cartClear")}
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

export default CartDrawer;

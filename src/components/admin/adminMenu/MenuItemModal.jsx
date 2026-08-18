import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Switch,
  MenuItem,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const INITIAL_FORM = {
  name: {
    en: "",
    hi: "",
    gu: "",
    pa: "",
    fr: "",
    es: "",
  },
  category: "Mains",
  price: "",
  image: "",
  isAvailable: true,
};

const DEFAULT_CATEGORIES = ["Starters", "Mains", "Bread", "Desserts", "Drinks"];

export default function MenuItemModal({
  open,
  onClose,
  onSubmit,
  editingItem,
  isLoading,
}) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name:
          typeof editingItem.name === "object"
            ? { ...INITIAL_FORM.name, ...editingItem.name }
            : { ...INITIAL_FORM.name, en: editingItem.name || "" },
        category: editingItem.category || "Mains",
        price: editingItem.price || "",
        image: editingItem.image || "",
        isAvailable: editingItem.isAvailable ?? true,
      });
    } else {
      setFormData(INITIAL_FORM);
    }
  }, [editingItem, open]);

  const handleNameChange = (lang, value) => {
    setFormData((prev) => ({
      ...prev,
      name: { ...prev.name, [lang]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 700, display: "flex", justifyContent: "center"}}>
          {editingItem
            ? t("admin.menuTab.modal.editTitle", "Edit Menu Item")
            : t("admin.menuTab.modal.createTitle", "Add New Menu Item")}
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2}>
            {/*--------------------- Multilingual Titles ----------------------*/}
            <Grid size={12}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
                {t("admin.menuTab.modal.multilingualHeading", "Item Titles (Multilingual)")}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="English Name"
                required
                fullWidth
                size="small"
                value={formData.name.en}
                onChange={(e) => handleNameChange("en", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Hindi Name (हिन्दी)"
                fullWidth
                size="small"
                value={formData.name.hi}
                onChange={(e) => handleNameChange("hi", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Gujarati Name (ગુજરાતી)"
                fullWidth
                size="small"
                value={formData.name.gu}
                onChange={(e) => handleNameChange("gu", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Punjabi Name (ਪੰਜਾਬੀ)"
                fullWidth
                size="small"
                value={formData.name.pa}
                onChange={(e) => handleNameChange("pa", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="French Name (Français)"
                fullWidth
                size="small"
                value={formData.name.fr}
                onChange={(e) => handleNameChange("fr", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Spanish Name (Español)"
                fullWidth
                size="small"
                value={formData.name.es}
                onChange={(e) => handleNameChange("es", e.target.value)}
              />
            </Grid>

            {/*--------------------- Category & Price ---------------------*/}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                label={t("admin.menuTab.modal.category", "Category")}
                required
                fullWidth
                size="small"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                {DEFAULT_CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {t(`customerMenu.categories.${cat}`, cat)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label={t("admin.menuTab.modal.price", "Price (₹) *")}
                type="number"
                required
                fullWidth
                size="small"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
              />
            </Grid>

            {/*------------------------ Image URL & Live Preview-------------------------*/}
            <Grid size={{ xs: 12, sm: 10 }}>
              <TextField
                label={t("admin.menuTab.modal.imageUrl")}
                required
                fullWidth
                size="small"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, image: e.target.value }))
                }
              />
            </Grid>
            <Grid
              size={{ xs: 12, sm: 2 }}
              sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Avatar
                src={formData.image}
                variant="rounded"
                sx={{ width: 40, height: 40 }}
              />
            </Grid>

            {/*------------------------ Availability Toggle -------------------------*/}
            <Grid size={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isAvailable}
                    color="success"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        isAvailable: e.target.checked,
                      }))
                    }
                  />
                }
                label={t("admin.menuTab.modal.inStockLabel", "Item is Available in Stock")}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} disabled={isLoading}>
            {t("close", "Cancel")}
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading
              ? t("saving", "Saving...")
              : editingItem
              ? t("admin.menuTab.modal.updateBtn", "Update Item")
              : t("admin.menuTab.modal.createBtn", "Create Item")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
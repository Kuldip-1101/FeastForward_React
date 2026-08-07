import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  itemTitle,
  isLoading,
}) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {t("admin.menuTab.deleteDialog.title", "Delete Menu Item")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t(
            "admin.menuTab.deleteDialog.confirmText",{ title: itemTitle },
            `Are you sure you want to delete "${itemTitle}"? This action will permanently remove it from the database.`
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={isLoading}>
          {t("close")}
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? t("deleting") : t("delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
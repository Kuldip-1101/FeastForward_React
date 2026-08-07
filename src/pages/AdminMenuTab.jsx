import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  Container,
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import MenuTable from "../components/adminMenu/MenuTable";
import MenuItemModal from "../components/adminMenu/MenuItemModal";
import DeleteConfirmDialog from "../components/adminMenu/DeleteConfirmDialog";
import MenuLoading from "../components/customerMenu/MenuLoading";
import MenuError from "../components/customerMenu/MenuError";

export default function AdminMenuTab() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const queryClient = useQueryClient();

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  //------------------ Modal states----------------------
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  //--------------------- Delete dialog state-------------------
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  //-------------------- Notification Toast---------------
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  //--------------------- Fetch Catalog-----------------
  const {
    data: menuItems = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["menuCatalog"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/menu`);
      if (!res.ok) throw new Error("Failed to fetch menu items from server.");
      return res.json();
    },
  });

  useEffect(() => {
    if (isError) {
      setToast({
        open: true,
        message: t(
          "admin.menuTab.notifications.fetchError",
          "Failed to fetch menu items from server."
        ),
        severity: "error",
      });
    }
  }, [isError, t]);

  //--------------------Create Mutation (POST)------------------
  const createMutation = useMutation({
    mutationFn: async (newItem) => {
      const res = await fetch(`${API_BASE_URL}/menu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) throw new Error("Failed to create menu item.");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["menuCatalog"]);
      setModalOpen(false);
      setToast({
        open: true,
        message: t("admin.menuTab.notifications.createSuccess", "Menu item created successfully!"),
        severity: "success",
      });
    },
    onError: (error) => {
      setToast({
        open: true,
        message:
          error.message ||
          t(
            "admin.menuTab.notifications.createError",
            "Failed to create menu item."
          ),
        severity: "error",
      });
    },
  });

  //--------------------Update Mutation (PUT)-------------------
  const updateMutation = useMutation({
    mutationFn: async (updatedItem) => {
      const res = await fetch(`${API_BASE_URL}/menu/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });
      if (!res.ok) throw new Error("Failed to update menu item.");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["menuCatalog"]);
      setModalOpen(false);
      setEditingItem(null);
      setToast({
        open: true,
        message: t("admin.menuTab.notifications.updateSuccess", "Menu item updated successfully!"),
        severity: "success",
      });
    },
    onError: (error) => {
      setToast({
        open: true,
        message:
          error.message ||
          t(
            "admin.menuTab.notifications.updateError",
            "Failed to update menu item."
          ),
        severity: "error",
      });
    }
  });

  //------------------ Quick Availability Toggle Mutation (PATCH)-------------------
  const patchAvailabilityMutation = useMutation({
    mutationFn: async ({ id, isAvailable }) => {
      const res = await fetch(`${API_BASE_URL}/menu/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable }),
      });
      if (!res.ok) throw new Error("Failed to update stock status.");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["menuCatalog"]);
      setToast({
        open: true,
        message: t("admin.menuTab.notifications.statusSuccess", "Stock status updated!"),
        severity: "info",
      });
    },
    onError: (error) => {
      setToast({
        open: true,
        message:
          error.message ||
          t(
            "admin.menuTab.notifications.statusError",
            "Failed to update stock status."
          ),
        severity: "error",
      });
    },
  });

  //------------------ Delete Mutation (DELETE)-----------------
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${API_BASE_URL}/menu/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete menu item.");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["menuCatalog"]);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      setToast({
        open: true,
        message: t("admin.menuTab.notifications.deleteSuccess", "Menu item deleted!"),
        severity: "warning",
      });
    },
    onError: (error) => {
      setToast({
        open: true,
        message:
          error.message ||
          t(
            "admin.menuTab.notifications.deleteError",
            "Failed to delete menu item."
          ),
        severity: "error",
      });
    },
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingItem) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleToggleAvailability = (id, isAvailable) => {
    patchAvailabilityMutation.mutate({ id, isAvailable });
  };

  const handleOpenDelete = (item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      deleteMutation.mutate(itemToDelete.id);
    }
  };

  if (isLoading) return <MenuLoading />;
  if (isError) return <MenuError />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/*-------------------------- Header ------------------------*/}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
            {t("admin.menuTab.title", "Menu Management")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "admin.menuTab.subtitle",
              "Create, update, and manage catalog stock levels in real time."
            )}
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          sx={{ borderRadius: 2, fontWeight: 600, textTransform: "none" }}
        >
          {t("admin.menuTab.addItemBtn", "Add New Item")}
        </Button>
      </Box>

      {/*------------------------ Catalog Table -------------------------*/}
      <MenuTable
        menuItems={menuItems}
        currentLang={currentLang}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        onToggleAvailability={handleToggleAvailability}
      />

      {/*------------------------ Create / Edit Modal -------------------------*/}
      <MenuItemModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
        editingItem={editingItem}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      {/*------------------------ Delete Confirmation Dialog -------------------------*/}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        itemTitle={
          itemToDelete
            ? typeof itemToDelete.name === "string"
              ? itemToDelete.name
              : itemToDelete.name?.[currentLang] || ""
            : ""
        }
        isLoading={deleteMutation.isPending}
      />

      {/*------------------------ Notification Toast -------------------------*/}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
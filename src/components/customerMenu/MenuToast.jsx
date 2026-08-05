import { Snackbar, Alert } from "@mui/material";

export default function MenuToast({ toast, onClose }) {
  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={toast.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
}
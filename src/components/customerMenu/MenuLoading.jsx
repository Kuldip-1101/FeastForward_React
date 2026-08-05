import { Box, CircularProgress } from "@mui/material";

export default function MenuLoading() {
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
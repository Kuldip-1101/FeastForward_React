import React from "react";
import { Paper, Box, Typography, Avatar } from "@mui/material";

export default function SummaryCard({ label, value, icon }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 3,
        height: "100%",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <Box>
        <Typography variant="body2" color="text.secondary" fontWeight={800} gutterBottom>
          {label}
        </Typography>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          {value ?? "—"}
        </Typography>
      </Box>

      {icon && (
        <Avatar
          sx={{
            bgcolor: "action.hover",
            width: 48,
            height: 48,
            borderRadius: 2,
          }}
        >
          {icon}
        </Avatar>
      )}
    </Paper>
  );
}
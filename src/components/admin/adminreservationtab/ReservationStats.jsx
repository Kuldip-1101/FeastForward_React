import React from "react";
import { Grid } from "@mui/material";
import SummaryCard from "./SummaryCard";
import { getStatItems } from "../../../constants/adminReservationTabConstant";

export default function ReservationStats({ stats, t }) {
  const statItems = getStatItems(stats, t);

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {statItems.map((item) => (
        <Grid key={item.key} size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard label={item.label} value={item.value} icon={item.icon} />
        </Grid>
      ))}
    </Grid>
  );
}
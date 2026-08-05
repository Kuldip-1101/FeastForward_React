import { Box, Tabs, Tab } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function CategoryTabs({ categories, selectedCategory, onSelectCategory }) {
  const { t } = useTranslation();

  if (categories.length <= 1) return null;

  return (
    <Box sx={{ mb: 5, borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={selectedCategory}
        onChange={(_, newValue) => onSelectCategory(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          "& .MuiTab-root": {
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1rem",
          },
        }}
      >
        {categories.map((cat) => (
          <Tab
            key={cat}
            label={
              cat === "ALL"
                ? t("customerMenu.allCategories")
                : t(`customerMenu.categories.${cat}`, cat)
            }
            value={cat}
          />
        ))}
      </Tabs>
    </Box>
  );
}
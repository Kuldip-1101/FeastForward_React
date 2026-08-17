import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";

import { useCurrentCart } from "../hooks/useCurrentCart";
import AuthModal from "../components/navbar/AuthModal";

import MenuHeader from "../components/customerMenu/MenuHeader";
import CategoryTabs from "../components/customerMenu/CategoryTabs";
import MenuItemCard from "../components/customerMenu/MenuItemCard";
import MenuLoading from "../components/customerMenu/MenuLoading";
import MenuError from "../components/customerMenu/MenuError";
import MenuToast from "../components/customerMenu/MenuToast";
import PageSEO from "../components/common/PageSEO";

function Menu() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  const { isAuthenticated } = useSelector((state) => state.auth);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { addItem } = useCurrentCart();

  const {
    data: menuItems = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["menuCatalog"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/menu`);
      if (!response.ok)
        throw new Error("Failed to capture local database entry stream.");
      return response.json();
    },
  });

  const categories = useMemo(() => {
    const list = menuItems.map((item) => item.category).filter(Boolean);
    return ["ALL", ...Array.from(new Set(list))];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "ALL") return menuItems;
    return menuItems.filter((item) => item.category === selectedCategory);
  }, [menuItems, selectedCategory]);

  const handlePreOrder = (item, itemTitle) => {
    if (!isAuthenticated) {
      setAuthOpen(true);
      return;
    }
    addItem(item);
    setToast({
      open: true,
      message: t("customerMenu.toast.itemAdded", { item: itemTitle }),
      severity: "success",
    });
  };

  if (isLoading) return <MenuLoading />;
  if (isError) return <MenuError />;

  return (
    <>
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <PageSEO
          title={t("seo.menuTitle", " Menu | FeastForward")}
          description={t(
            "seo.menuDesc",
            "Explore our chef-crafted signature dishes and pre-order ahead of time.",
          )}
        />

        <MenuHeader />

        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <Grid container spacing={4}>
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              currentLang={currentLang}
              onPreOrder={handlePreOrder}
            />
          ))}
        </Grid>
      </Container>

      <AuthModal open={authOpen} handleClose={() => setAuthOpen(false)} />

      <MenuToast
        toast={toast}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
}

export default Menu;

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
  Chip,
  Avatar,
  Typography,
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  Tooltip,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { formatLocalizedPrice } from "../../../utils/formatCurrency";

export default function MenuTable({
  menuItems = [],
  currentLang,
  onEdit,
  onDelete,
  onToggleAvailability,
}) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  //------------------- Pagination States ------------------
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //------------------- Extract unique categories dynamically ------------------
  const categories = useMemo(() => {
    const list = menuItems.map((item) => item.category).filter(Boolean);
    return ["ALL", ...Array.from(new Set(list))];
  }, [menuItems]);

  //------------------- Filter items based on search term & category selection ------------------
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const title =
        typeof item.name === "string"
          ? item.name
          : item.name?.[currentLang] || item.name?.en || "";

      const matchesSearch = title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "ALL" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [menuItems, searchQuery, selectedCategory, currentLang]);

  //------------------- Paginated Subset ------------------
  const paginatedItems = useMemo(() => {
    return filteredItems.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredItems, page, rowsPerPage]);

  //------------ Reset to page 0 whenever filter or search inputs change-------------
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getItemTitle = (item) => {
    if (typeof item.name === "string") return item.name;
    return (
      item.name?.[currentLang] ||
      item.name?.en ||
      t("customerMenu.defaultItemName")
    );
  };

  return (
    <Box>
      {/*------------------- Search & Filter Toolbar ----------------------*/}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          placeholder={t("admin.menuTab.searchPlaceholder", "Search menu item...")}
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          select
          size="small"
          value={selectedCategory}
          onChange={handleCategoryChange}
          sx={{ minWidth: 180 }}
          label={t("admin.menuTab.filterCategory", "Category")}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat === "ALL"
                ? t("customerMenu.allCategories", "All Categories")
                : t(`customerMenu.categories.${cat}`, cat)}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/*------------------- Main Catalog Table ----------------------*/}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "action.hover" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>
                {t("admin.menuTab.table.colItem", "Item")}
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>
                {t("admin.menuTab.table.colCategory", "Category")}
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>
                {t("admin.menuTab.table.colPrice", "Price")}
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">
                {t("admin.menuTab.table.colStatus", "In Stock")}
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                {t("admin.menuTab.table.colActions", "Actions")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">
                    {t("admin.menuTab.table.noItemsFound", "No menu items found.")}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedItems.map((item) => {
                const isAvailable = item.isAvailable ?? true;
                const title = getItemTitle(item);

                return (
                  <TableRow
                    key={item.id}
                    hover
                    sx={{ opacity: isAvailable ? 1 : 0.6 }}
                  >
                    {/*------------------- Item Avatar + Title ----------------------*/}
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar
                          src={item.image}
                          alt={title}
                          variant="rounded"
                          sx={{ width: 48, height: 48 }}
                        />
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {title}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/*--------------------- Category Chip ----------------------*/}
                    <TableCell>
                      <Chip
                        label={t(
                          `customerMenu.categories.${item.category}`,
                          item.category || "General"
                        )}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>

                    {/*--------------------- Localized Price ----------------------*/}
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {formatLocalizedPrice(item.price, 1, currentLang)}
                      </Typography>
                    </TableCell>

                    {/*--------------------- Quick Availability Toggle ----------------------*/}
                    <TableCell align="center">
                      <Tooltip
                        title={
                          isAvailable
                            ? t("admin.menuTab.table.markOutOfStock", "Click to mark Out of Stock")
                            : t("admin.menuTab.table.markAvailable", "Click to mark Available")
                        }
                      >
                        <Switch
                          checked={isAvailable}
                          color="success"
                          size="small"
                          onChange={() =>
                            onToggleAvailability(item.id, !isAvailable)
                          }
                        />
                      </Tooltip>
                    </TableCell>

                    {/*--------------------- Actions ----------------------*/}
                    <TableCell align="right">
                      <Tooltip title={t("admin.menuTab.table.edit", "Edit Item")}>
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => onEdit(item)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t("admin.menuTab.table.delete", "Delete Item")}>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => onDelete(item)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/*------------------- Pagination Controller ----------------------*/}
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={t("admin.menuTab.table.rowsPerPage", "Rows per page:")}
        />
      </TableContainer>
    </Box>
  );
}
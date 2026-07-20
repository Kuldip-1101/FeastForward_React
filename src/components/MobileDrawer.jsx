import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Stack,
  Button,
  Avatar,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

function MobileDrawer({
  open,
  onClose,
  isAuthenticated,
  user,
  onLogout,
  onOpenAuth,
}) {
  const { t } = useTranslation();

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 280,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          p: 2.5,
        }}
        role="presentation"
      >
        {/*-------------- Top Section: Brand Title & Nav Links --------------*/}
        <Box>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            onClick={onClose}
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              textDecoration: "none",
              display: "block",
              mb: 2,
              px: 1,
            }}
          >
            FeastForward
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <List disablePadding>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={NavLink}
                to="/"
                onClick={onClose}
                sx={{
                  borderRadius: 2,
                  "&.active": {
                    color: "primary.main",
                    backgroundColor: "action.selected",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                  <HomeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={t("navHome")}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to="/menu"
                onClick={onClose}
                sx={{
                  borderRadius: 2,
                  "&.active": {
                    color: "primary.main",
                    backgroundColor: "action.selected",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                  <RestaurantMenuIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={t("navMenu")}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        {/*-------------- Bottom Section: User Card & Action --------------*/}
        <Box
          sx={{
            mt: "auto",
            pt: 2,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          {isAuthenticated ? (
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "action.hover",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 36,
                    height: 36,
                    fontSize: "0.9rem",
                    fontWeight: 700,
                  }}
                >
                  {user?.name ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <PersonIcon fontSize="small" />
                  )}
                </Avatar>
                <Box sx={{ overflow: "hidden" }}>
                  <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{ fontWeight: 700, lineHeight: 1.2 }}
                  >
                    {user?.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap display="block">
                    {user?.email || "Logged in"}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="outlined"
                color="error"
                fullWidth
                startIcon={<LogoutIcon />}
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                sx={{ fontWeight: 600, borderRadius: 2 }}
              >
                {t("logout")}
              </Button>
            </Stack>
          ) : (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<LoginIcon />}
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              sx={{ fontWeight: 600, borderRadius: 2 }}
            >
              {t("login")}
            </Button>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}

export default MobileDrawer;
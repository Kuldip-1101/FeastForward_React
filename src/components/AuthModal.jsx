import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Stack,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function AuthModal({ open, handleClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  //------------- Initialize the React Hook Form core elements -----------------
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched", // Validates fields live as soon as the user finishes typing and clicks away
  });

  //-------------- TanStack Query Mutation Logic -----------------
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await fetch(
        `http://localhost:5000/users?email=${email}`,
      );
      if (!response.ok) throw new Error("Server error");
      const users = await response.json();

      //--------------  verification of text password -----------
      if (users.length === 0 || users[0].password !== password) {
        throw new Error("invalidCredentials");
      }
      return users[0]; //---- Return user object matches
    },
    onSuccess: (userData) => {
      dispatch(loginSuccess(userData)); //---- Save profile details inside Redux store
      setErrorMessage("");
      reset();
      handleClose();
    },
    onError: (error) => {
      //---- Show error messages in popup alert box ----
      setErrorMessage(
        error.message === "invalidCredentials"
          ? t("invalidCredentials")
          : "Connection error",
      );
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate({ email: data.email, password: data.password });
  };

  const handleModalClose = () => {
    setErrorMessage("");
    reset();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleModalClose}
      fullWidth
      maxWidth="xs"
      paperprops={{
        sx: { borderRadius: 3, p: 2, bgcolor: "background.paper" },
      }}
    >
      {/*----------- Dynamic Centered Icon Header ---------------*/}
      <Stack sx={{ mt: 2 }}>
        <AccountCircleIcon
          sx={{
            fontSize: 50,
            color: "primary.main",
            textAlign: "center",
            width: "100%",
          }}
        />
        <DialogTitle
          sx={{ fontWeight: "bold", pb: 1, textAlign: "center", width: "100%" }}
        >
          {t("login")}
        </DialogTitle>
      </Stack>

      {/*-------------- Form Context wrapper using standard submission mechanics -----------------*/}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent sx={{ pb: 1 }}>
          <Stack spacing={3}>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            {/*--------- Email Field with validation--------- */}
            <TextField
              label={t("emailLabel")}
              fullWidth
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email", {
                required: t("emailRequired"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("invalidEmail"),
                },
              })}
            />

            {/*------------- Password input with validation ------------*/}
            <TextField
              label={t("passwordLabel")}
              type="password"
              fullWidth
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password", {
                required: t("passRequired"),
                minLength: {
                  value: 6,
                  message: t("passMinLength"),
                },
              })}
            />
          </Stack>
        </DialogContent>

        {/*-------- Modal Interactivity Button Blocks ------------*/}
        <DialogActions sx={{ px: 3, pb: 2, mt: 1 }}>
          <Button
            onClick={handleModalClose}
            color="inherit"
            sx={{ fontWeight: "600" }}
          >
            {t("close")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loginMutation.isPending} // Disables button while network request flies
            sx={{
              fontWeight: "bold",
              color: "#ffffff",
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "#B3922E" },
            }}
          >
            {loginMutation.isPending ? "..." : t("submitAuth")}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default AuthModal;

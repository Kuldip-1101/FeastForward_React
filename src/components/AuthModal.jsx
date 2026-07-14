import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function AuthModal({ open, handleClose }) {
  const { t } = useTranslation();
  
  //------------- Initialize the React Hook Form core elements -----------------
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm({
    mode: 'onTouched' // Validates fields live as soon as the user finishes typing and clicks away
  });

  const onSubmit = (data) => {
    console.log("Authentication Form Submitted Successfully Data Output:", data);
    reset(); // Clears form fields 
    handleClose(); // Closes the Dialog window modal 
  };

  const handleModalClose = () => {
    reset();
    handleClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleModalClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: { borderRadius: 3, p: 2, bgcolor: 'background.paper' }
      }}
    >
      {/*----------- Dynamic Centered Icon Header ---------------*/}
      <Stack  sx={{ mt: 2 }}>
        <AccountCircleIcon sx={{ fontSize: 50, color: 'primary.main', textAlign: 'center', width: '100%' }} />
        <DialogTitle sx={{ fontWeight: 'bold', pb: 1, textAlign: 'center', width: '100%' }}>{t('login')}</DialogTitle>
      </Stack>

      {/*-------------- Form Context wrapper using standard submission mechanics -----------------*/}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent sx={{ pb: 1 }}>
          <Stack spacing={3}>
            
            {/*--------- Email Field with validation--------- */}
            <TextField
              label={t('emailLabel')}
              fullWidth
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email', {
                required: t('emailRequired'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('invalidEmail')
                }
              })}
            />

            {/*------------- Password input with validation ------------*/}
            <TextField
              label={t('passwordLabel')}
              type="password"
              fullWidth
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password', {
                required: t('passRequired'),
                minLength: {
                  value: 6,
                  message: t('passMinLength')
                }
              })}
            />

          </Stack>
        </DialogContent>

        {/*-------- Modal Interactivity Button Blocks ------------*/}
        <DialogActions sx={{ px: 3, pb: 2, mt: 1 }}>
          <Button onClick={handleModalClose} color="inherit" sx={{ fontWeight: '600' }}>
            {t('close')}
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#ffffff', 
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: '#B3922E' }
            }}
          >
            {t('submitAuth')}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default AuthModal;
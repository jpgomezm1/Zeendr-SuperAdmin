import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '20px',
    padding: theme.spacing(2),
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 'bold',
  color: '#5E56FB',
}));

const StyledDialogContentText = styled(DialogContentText)(({ theme }) => ({
  textAlign: 'center',
  color: 'black',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1.5),
  borderRadius: '10px',
  backgroundColor: '#5E56FB',
  color: 'white',
  '&:hover': {
    backgroundColor: '#7b45a1',
  },
}));

const AuthDialog = ({ open, handleClose, handleAuth }) => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    handleAuth(password);
    setPassword('');
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <StyledDialogTitle>Autenticación Requerida</StyledDialogTitle>
      <DialogContent>
        <StyledDialogContentText>
          Por favor, ingresa la contraseña para acceder a la gestión de usuarios.
        </StyledDialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Contraseña"
          type="password"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="center" width="100%">
          <StyledButton onClick={handleClose}>
            Cancelar
          </StyledButton>
          <StyledButton onClick={handleSubmit}>
            Confirmar
          </StyledButton>
        </Box>
      </DialogActions>
    </StyledDialog>
  );
};

export default AuthDialog;



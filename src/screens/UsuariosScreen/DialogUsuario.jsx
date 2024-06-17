import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CardMedia
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Funciones para extraer nombres de usuario de las URLs
const extractInstagramUsername = (url) => {
  if (!url) return '@';
  const match = url.match(/instagram\.com\/([^/]+)/);
  return match ? `@${match[1]}` : '@';
};

const extractTiktokUsername = (url) => {
  if (!url) return '@';
  const match = url.match(/tiktok\.com\/@([^/]+)/);
  return match ? `@${match[1]}` : '@';
};

const extractWhatsappNumber = (url) => {
  if (!url) return '';
  const match = url.match(/wa\.me\/(\d+)/);
  if (match) {
    const number = match[1];
    return `(+${number.slice(0, 2)})-${number.slice(2, 5)}-${number.slice(5, 8)}-${number.slice(8)}`;
  }
  return '';
};

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontWeight: 'bold',
  textTransform: 'uppercase'
}));

const InfoTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1)
}));

const ColorBox = styled(Box)(({ theme, bgcolor }) => ({
  width: theme.spacing(6),
  height: theme.spacing(6),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: bgcolor,
  border: `1px solid ${theme.palette.divider}`,
  display: 'inline-block',
  marginLeft: theme.spacing(1),
  verticalAlign: 'middle'
}));

const DialogUsuario = ({ open, handleClose, selectedUsuario, newUser, handleInputChange, handleRegister }) => {
  const token = useSelector((state) => state.auth.token);
  const [editUser, setEditUser] = useState({ ...selectedUsuario });

  useEffect(() => {
    if (selectedUsuario) {
      setEditUser({ ...selectedUsuario });
    }
  }, [selectedUsuario]);

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/usuario/${editUser.id}`, editUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      handleClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{selectedUsuario ? 'Información del Usuario' : 'Registrar Nuevo Usuario'}</DialogTitle>
      <DialogContent>
        {selectedUsuario ? (
          <>
            <SectionTitle variant="h6">Información General</SectionTitle>
            <TextField
              margin="dense"
              label="Username"
              name="username"
              value={editUser.username}
              onChange={handleEditInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Establecimiento"
              name="establecimiento"
              value={editUser.establecimiento}
              onChange={handleEditInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Dirección de Origen"
              name="direccion_origen"
              value={editUser.direccion_origen}
              onChange={handleEditInputChange}
              fullWidth
            />
            <Divider />
            <SectionTitle variant="h6">Imágenes y Redes Sociales</SectionTitle>
            <InfoTypography variant="body2">Logo:</InfoTypography>
            <CardMedia
              component="img"
              height="100"
              image={editUser.logo_url}
              alt="Logo"
              sx={{ mb: 2, objectFit: 'contain' }}
            />
            <TextField
              margin="dense"
              label="Logo URL"
              name="logo_url"
              value={editUser.logo_url}
              onChange={handleEditInputChange}
              fullWidth
            />
            <InfoTypography variant="body2">Banner 1:</InfoTypography>
            <CardMedia
              component="img"
              height="100"
              image={editUser.banner1_url}
              alt="Banner 1"
              sx={{ mb: 2, objectFit: 'contain' }}
            />
            <TextField
              margin="dense"
              label="Banner 1 URL"
              name="banner1_url"
              value={editUser.banner1_url}
              onChange={handleEditInputChange}
              fullWidth
            />
            <InfoTypography variant="body2">Banner 2:</InfoTypography>
            <CardMedia
              component="img"
              height="100"
              image={editUser.banner2_url}
              alt="Banner 2"
              sx={{ mb: 2, objectFit: 'contain' }}
            />
            <TextField
              margin="dense"
              label="Banner 2 URL"
              name="banner2_url"
              value={editUser.banner2_url}
              onChange={handleEditInputChange}
              fullWidth
            />
            <InfoTypography variant="body2">Banner 3:</InfoTypography>
            <CardMedia
              component="img"
              height="100"
              image={editUser.banner3_url}
              alt="Banner 3"
              sx={{ mb: 2, objectFit: 'contain' }}
            />
            <TextField
              margin="dense"
              label="Banner 3 URL"
              name="banner3_url"
              value={editUser.banner3_url}
              onChange={handleEditInputChange}
              fullWidth
            />
            <InfoTypography variant="body2">Instagram: {extractInstagramUsername(editUser.instagram_url)}</InfoTypography>
            <TextField
              margin="dense"
              label="Instagram Username"
              name="instagram_url"
              value={editUser.instagram_url}
              onChange={handleEditInputChange}
              fullWidth
            />
            <InfoTypography variant="body2">Tiktok: {extractTiktokUsername(editUser.tiktok_url)}</InfoTypography>
            <TextField
              margin="dense"
              label="Tiktok Username"
              name="tiktok_url"
              value={editUser.tiktok_url}
              onChange={handleEditInputChange}
              fullWidth
            />
            <InfoTypography variant="body2">Whatsapp: {extractWhatsappNumber(editUser.whatsapp_url)}</InfoTypography>
            <TextField
              margin="dense"
              label="Whatsapp Number"
              name="whatsapp_url"
              value={editUser.whatsapp_url}
              onChange={handleEditInputChange}
              fullWidth
            />
            <Divider />
            <SectionTitle variant="h6">Colores Personalizados</SectionTitle>
            <Box display="flex" alignItems="center">
              <TextField
                margin="dense"
                label="Primary Color"
                name="primary_color"
                value={editUser.primary_color}
                onChange={handleEditInputChange}
                fullWidth
              />
              <ColorBox bgcolor={editUser.primary_color} />
            </Box>
            <Box display="flex" alignItems="center">
              <TextField
                margin="dense"
                label="Secondary Color"
                name="secondary_color"
                value={editUser.secondary_color}
                onChange={handleEditInputChange}
                fullWidth
              />
              <ColorBox bgcolor={editUser.secondary_color} />
            </Box>
            <Box display="flex" alignItems="center">
              <TextField
                margin="dense"
                label="Custom Light Color"
                name="custom_light_color"
                value={editUser.custom_light_color}
                onChange={handleEditInputChange}
                fullWidth
              />
              <ColorBox bgcolor={editUser.custom_light_color} />
            </Box>
            <Box display="flex" alignItems="center">
              <TextField
                margin="dense"
                label="Custom Dark Color"
                name="custom_dark_color"
                value={editUser.custom_dark_color}
                onChange={handleEditInputChange}
                fullWidth
              />
              <ColorBox bgcolor={editUser.custom_dark_color} />
            </Box>
            <Box display="flex" alignItems="center">
              <TextField
                margin="dense"
                label="Custom Hoover Color"
                name="custom_hoover_color"
                value={editUser.custom_hoover_color}
                onChange={handleEditInputChange}
                fullWidth
              />
              <ColorBox bgcolor={editUser.custom_hoover_color} />
            </Box>
            <Divider />
            <SectionTitle variant="h6">Cuenta y QR</SectionTitle>
            <TextField
              margin="dense"
              label="Número de Cuenta"
              name="account_number"
              value={editUser.account_number}
              onChange={handleEditInputChange}
              fullWidth
            />
            <InfoTypography variant="body2">QR Code:</InfoTypography>
            <CardMedia
              component="img"
              height="100"
              image={editUser.qr_code_url}
              alt="QR Code"
              sx={{ mb: 2, objectFit: 'contain' }}
            />
            <TextField
              margin="dense"
              label="QR Code URL"
              name="qr_code_url"
              value={editUser.qr_code_url}
              onChange={handleEditInputChange}
              fullWidth
            />
            <Divider />
            <SectionTitle variant="h6">Otros</SectionTitle>
            <FormControl fullWidth margin="dense">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={editUser.role}
                onChange={handleEditInputChange}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="super_admin">Super Admin</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Tipo de Plan</InputLabel>
              <Select
                name="tipo_plan"
                value={editUser.tipo_plan}
                onChange={handleEditInputChange}
              >
                <MenuItem value="Software">Software</MenuItem>
                <MenuItem value="Domicilios">Domicilios</MenuItem>
              </Select>
            </FormControl>
          </>
        ) : (
          <>
            <SectionTitle variant="h6">Información General</SectionTitle>
            <TextField
              margin="dense"
              label="Username"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Password"
              name="password"
              type="password"
              value={newUser.password}
              onChange={handleInputChange}
              fullWidth
            />
            <InfoTypography variant="body2">Contraseña: {newUser.password}</InfoTypography>
            <TextField
              margin="dense"
              label="Establecimiento"
              name="establecimiento"
              value={newUser.establecimiento}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Dirección de Origen"
              name="direccion_origen"
              value={newUser.direccion_origen}
              onChange={handleInputChange}
              fullWidth
            />
            <Divider />
            <SectionTitle variant="h6">Imágenes y Redes Sociales</SectionTitle>
            <TextField
              margin="dense"
              label="Logo URL"
              name="logo_url"
              value={newUser.logo_url}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Banner 1 URL"
              name="banner1_url"
              value={newUser.banner1_url}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Banner 2 URL"
              name="banner2_url"
              value={newUser.banner2_url}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Banner 3 URL"
              name="banner3_url"
              value={newUser.banner3_url}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Instagram Username"
              name="instagram_username"
              value={newUser.instagram_username}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Tiktok Username"
              name="tiktok_username"
              value={newUser.tiktok_username}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Whatsapp Number"
              name="whatsapp_number"
              value={newUser.whatsapp_number}
              onChange={handleInputChange}
              fullWidth
            />
            <Divider />
            <SectionTitle variant="h6">Colores Personalizados</SectionTitle>
            <Box display="flex" alignItems="center">
              <TextField
                margin="dense"
                label="Primary Color"
                name="primary_color"
                value={newUser.primary_color}
                onChange={handleInputChange}
                fullWidth
              />
              <ColorBox bgcolor={newUser.primary_color} />
            </Box>
            <Box display="flex" alignItems="center">
              <TextField
                margin="dense"
                label="Secondary Color"
                name="secondary_color"
                value={newUser.secondary_color}
                onChange={handleInputChange}
                fullWidth
              />
              <ColorBox bgcolor={newUser.secondary_color} />
            </Box>
            <Box display="flex" alignItems="center">
              <TextField
                margin="dense"
                label="Custom Light Color"
                name="custom_light_color"
                value={newUser.custom_light_color}
                onChange={handleInputChange}
                fullWidth
              />
              <ColorBox bgcolor={newUser.custom_light_color} />
            </Box>
            <Box display="flex" alignItems="center">
              <TextField
                margin="dense"
                label="Custom Dark Color"
                name="custom_dark_color"
                value={newUser.custom_dark_color}
                onChange={handleInputChange}
                fullWidth
              />
              <ColorBox bgcolor={newUser.custom_dark_color} />
            </Box>
            <Box display="flex" alignItems="center">
              <TextField
                margin="dense"
                label="Custom Hoover Color"
                name="custom_hoover_color"
                value={newUser.custom_hoover_color}
                onChange={handleInputChange}
                fullWidth
              />
              <ColorBox bgcolor={newUser.custom_hoover_color} />
            </Box>
            <Divider />
            <SectionTitle variant="h6">Cuenta y QR</SectionTitle>
            <TextField
              margin="dense"
              label="Número de Cuenta"
              name="account_number"
              value={newUser.account_number}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="QR Code URL"
              name="qr_code_url"
              value={newUser.qr_code_url}
              onChange={handleInputChange}
              fullWidth
            />
            <Divider />
            <SectionTitle variant="h6">Otros</SectionTitle>
            <FormControl fullWidth margin="dense">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="super_admin">Super Admin</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Tipo de Plan</InputLabel>
              <Select
                name="tipo_plan"
                value={newUser.tipo_plan}
                onChange={handleInputChange}
              >
                <MenuItem value="Software">Software</MenuItem>
                <MenuItem value="Domicilios">Domicilios</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#5E56FB'}} >
          {selectedUsuario ? 'Cerrar' : 'Cancelar'}
        </Button>
        {selectedUsuario ? (
          <Button onClick={handleUpdate} sx={{ color: '#5E56FB'}}>
            Actualizar
          </Button>
        ) : (
          <Button onClick={handleRegister} sx={{ color: '#5E56FB'}}>
            Registrar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogUsuario;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
  TextField,
} from '@mui/material';
import { useSelector } from 'react-redux';
import CardUsuario from './CardUsuario';
import DialogUsuario from './DialogUsuario';
import AuthDialog from './AuthDialog';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { styled } from '@mui/system';
import { apiClient } from '../../apiClient';

const SummaryCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#5E56FB',
  color: 'white',
  textAlign: 'center',
  borderRadius: '15px',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
  },
}));

const SummaryCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100px',
}));

const UsuariosScreen = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]); // Nuevo estado para usuarios filtrados
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(true);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    establecimiento: '',
    direccion_origen: '',
    logo_url: '',
    banner1_url: '',
    banner2_url: '',
    banner3_url: '',
    instagram_username: '',
    tiktok_username: '',
    whatsapp_number: '',
    primary_color: '',
    secondary_color: '',
    custom_light_color: '',
    custom_dark_color: '',
    custom_hoover_color: '',
    role: 'user',
    tipo_plan: 'Software',
    notificacion_email: '',
    notificacion_telefono: '',
  });

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (authenticated) {
      fetchUsuarios();
    }
  }, [token, authenticated]);

  const fetchUsuarios = async () => {
    try {
      const response = await apiClient.get('/usuarios');
      setUsuarios(response.data);
      setFilteredUsuarios(response.data); // Inicializa usuarios filtrados
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUsuario(null);
  };

  const handleCardClick = (usuario) => {
    setSelectedUsuario(usuario);
    setOpen(true);
  };

  const handleRegister = async () => {
    try {
      await apiClient.post('/register', newUser);
      setOpen(false);
      setNewUser({
        username: '',
        password: '',
        establecimiento: '',
        direccion_origen: '',
        logo_url: '',
        banner1_url: '',
        banner2_url: '',
        banner3_url: '',
        instagram_username: '',
        tiktok_username: '',
        whatsapp_number: '',
        primary_color: '',
        secondary_color: '',
        custom_light_color: '',
        custom_dark_color: '',
        custom_hoover_color: '',
        role: 'user',
        tipo_plan: 'Software',
      });
      fetchUsuarios();
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleDeleteClick = (usuario) => {
    setUserToDelete(usuario);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(`/usuario/${userToDelete.id}`);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      fetchUsuarios();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleAuth = (password) => {
    if (password === 'Nov2011*') {
      setAuthenticated(true);
      setAuthDialogOpen(false);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const handleFreezeToggle = async (usuario) => {
    try {
      await apiClient.put(`/usuario/freeze/${usuario.id}`, { is_frozen: !usuario.is_frozen });
      fetchUsuarios();
    } catch (error) {
      console.error('Error freezing/unfreezing user:', error);
    }
  };

  // Calcular resumen de usuarios
  const totalUsuarios = usuarios.filter((usuario) => usuario.role !== 'super_admin' && !usuario.is_frozen).length;
  const totalDomicilios = usuarios.filter((usuario) => usuario.tipo_plan === 'Domicilios' && usuario.role !== 'super_admin' && !usuario.is_frozen).length;
  const totalSoftware = usuarios.filter((usuario) => usuario.tipo_plan === 'Software' && usuario.role !== 'super_admin' && !usuario.is_frozen).length;
  const totalCongelados = usuarios.filter((usuario) => usuario.is_frozen && usuario.role !== 'super_admin').length;

  // Manejar el cambio de la barra de búsqueda
  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    setFilteredUsuarios(
      usuarios.filter((usuario) =>
        usuario.username.toLowerCase().includes(searchValue)
      )
    );
  };

  if (!authenticated) {
    return (
      <AuthDialog
        open={authDialogOpen}
        handleClose={() => setAuthDialogOpen(false)}
        handleAuth={handleAuth}
      />
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Usuarios Registrados
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
          <SummaryCard>
            <SummaryCardContent>
              <Typography variant="h5">Total Usuarios Activos</Typography>
              <Typography variant="h6">{totalUsuarios}</Typography>
            </SummaryCardContent>
          </SummaryCard>
        </Grid>
        <Grid item xs={12} sm={3}>
          <SummaryCard>
            <SummaryCardContent>
              <Typography variant="h5">Plan Domicilios</Typography>
              <Typography variant="h6">{totalDomicilios}</Typography>
            </SummaryCardContent>
          </SummaryCard>
        </Grid>
        <Grid item xs={12} sm={3}>
          <SummaryCard>
            <SummaryCardContent>
              <Typography variant="h5">Plan Software</Typography>
              <Typography variant="h6">{totalSoftware}</Typography>
            </SummaryCardContent>
          </SummaryCard>
        </Grid>
        <Grid item xs={12} sm={3}>
          <SummaryCard>
            <SummaryCardContent>
              <Typography variant="h5">Cuentas Congeladas</Typography>
              <Typography variant="h6">{totalCongelados}</Typography>
            </SummaryCardContent>
          </SummaryCard>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          mt: 2,
          mb: 2,
          backgroundColor: '#5E56FB',
          color: 'white',
          borderRadius: '10px',
          '&:hover': { backgroundColor: '#7b45a1' },
        }}
        startIcon={<PersonAddAltIcon />}
      >
        Registrar Nuevo Usuario
      </Button>
      <TextField
        label="Buscar usuario por nombre"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={2}>
        {filteredUsuarios.map((usuario) => (
          <Grid item xs={12} sm={6} md={4} key={usuario.id}>
            <CardUsuario
              usuario={usuario}
              onClick={handleCardClick}
              onDelete={handleDeleteClick}
              onFreezeToggle={handleFreezeToggle}
            />
          </Grid>
        ))}
      </Grid>
      <DialogUsuario
        open={open}
        handleClose={handleClose}
        selectedUsuario={selectedUsuario}
        newUser={newUser}
        handleInputChange={handleInputChange}
        handleRegister={handleRegister}
      />
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar al usuario {userToDelete?.username}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} sx={{ color: '#5E56FB' }}>
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} sx={{ color: '#FF0000' }}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsuariosScreen;

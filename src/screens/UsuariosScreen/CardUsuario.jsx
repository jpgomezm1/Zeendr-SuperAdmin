import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const StyledCard = styled(Card)(({ theme, usuario }) => ({
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)'
  },
  borderRadius: '15px',
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: usuario.role === 'super_admin' ? '#FFD700' : usuario.is_frozen ? '#FF6347' : '#90EE90'
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  '& .MuiTypography-h6': {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  },
  '& .MuiTypography-body2': {
    color: theme.palette.text.secondary
  }
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '160px',
  backgroundColor: '#f0f0f0',
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const LogoImage = styled(CardMedia)(({ theme }) => ({
  height: '100px',
  width: '100px',
  borderRadius: '50%',
  border: `3px solid ${theme.palette.primary.main}`,
  objectFit: 'cover'
}));

const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

const CardUsuario = ({ usuario, onClick, onDelete, onFreezeToggle }) => {
  return (
    <StyledCard usuario={usuario}>
      <LogoContainer onClick={() => onClick(usuario)}>
        <LogoImage
          component="img"
          image={usuario.logo_url}
          alt={usuario.username}
        />
      </LogoContainer>
      <CardContentStyled onClick={() => onClick(usuario)}>
        <Typography variant="h6" sx={{ color: 'black'}}>{usuario.username}</Typography>
        <Typography variant="body2" sx={{ color: 'black', fontWeight: 'bold'}}>Establecimiento: {capitalizeWords(usuario.establecimiento)}</Typography>
        <Typography variant="body2" sx={{ color: 'black', fontWeight: 'bold'}}>Tipo de Plan: {usuario.tipo_plan}</Typography>
      </CardContentStyled>
      <IconButton
        sx={{ position: 'absolute', top: 8, right: 48 }}
        onClick={(e) => {
          e.stopPropagation();
          onFreezeToggle(usuario);
        }}
        disabled={usuario.role === 'super_admin'}
      >
        {usuario.is_frozen ? <LockOpenIcon /> : <LockIcon />}
      </IconButton>
      <IconButton
        sx={{ position: 'absolute', top: 8, right: 8 }}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(usuario);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </StyledCard>
  );
};

export default CardUsuario;


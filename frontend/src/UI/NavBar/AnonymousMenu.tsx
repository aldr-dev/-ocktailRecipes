import {Button, Grid} from '@mui/material';
import {NavLink} from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <Grid item sx={{display: 'flex', gap: 1}}>
      <Button component={NavLink} sx={{
        backgroundColor: '#001F3F',
        borderRadius: '50px',
        color: '#fff',
        fontWeight: '600',
        py: 1,
        px: 1.5,
        '&:hover': {
          backgroundColor: '#002e60',
        },
      }} to="/login">
        Войти
      </Button>
      <Button component={NavLink} sx={{
        backgroundColor: '#E9E9E9',
        borderRadius: '50px',
        color: '#000',
        fontWeight: '600',
        py: 1,
        px: 1.5,
        '&:hover': {
          backgroundColor: '#d7d7d7',
        },
      }} to="/register">
        Регистрация
      </Button>
    </Grid>
  );
};

export default AnonymousMenu;
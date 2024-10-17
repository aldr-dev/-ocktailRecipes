import React, {useState} from 'react';
import {Avatar, Box, Grid, TextField, Typography, Link, Alert} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {selectGoogleError, selectGoogleLoading, selectLoginError, selectLoginLoading} from './usersSlice';
import {LoginMutation} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {login} from './usersThunks';
import {LoadingButton} from '@mui/lab';
import LoginWithGoogle from './components/LoginWithGoogle';
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginLoader = useAppSelector(selectLoginLoading);
  const error = useAppSelector(selectLoginError);
  const googleLoader = useAppSelector(selectGoogleLoading);
  const googleError = useAppSelector(selectGoogleError);

  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (state.email.trim().length !== 0 && state.password.trim().length !== 0) {
        await dispatch(login(state)).unwrap();
        navigate('/');
      }
    } catch (error) {
      console.error('Произошла ошибка при попытке авторизации. Пожалуйста, попробуйте позже. ' + error);
    }
  };

  return (
    <Box
      sx={{
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        margin: 'auto',
      }}>
      <Avatar sx={{m: 1, bgcolor: '#001F3F', width: 56, height: 56}}>
        <LockOpenIcon fontSize="large"/>
      </Avatar>
      <Typography component="h1" color="#000" variant="h5" sx={{mb: 3}}>
        Авторизация
      </Typography>
      <Box component="form" onSubmit={submitFormHandler} sx={{width: '100%'}}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <TextField
              required
              type="email"
              fullWidth
              variant="outlined"
              label="Электронная почта"
              name="email"
              autoComplete="current-email"
              value={state.email}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              fullWidth
              variant="outlined"
              type="password"
              label="Пароль"
              name="password"
              autoComplete="current-password"
              value={state.password}
              onChange={inputChangeHandler}
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          loadingPosition="start"
          startIcon={<LoginIcon/>}
          disabled={state.email.trim().length === 0 || state.password.trim().length === 0}
          loading={loginLoader || googleLoader}
          variant="contained"
          sx={{
            mt: 4,
            width: '100%',
            backgroundColor: '#001F3F',
            '&:hover': {
              backgroundColor: '#002e60',
            },
            '&.Mui-disabled': {
              background: '#b2b2b2',
              color: '#757575',
            },
            color: '#fff',
            borderRadius: '8px',
            fontWeight: 'bold',
            padding: '12px 0',
            '& .MuiLoadingButton-loadingIndicator': {
              color: '#fff',
            },
          }}>
          <span>Войти</span>
        </LoadingButton>
        <Box sx={{mt: 3}}>
          <LoginWithGoogle/>
        </Box>
        <Link
          component={RouterLink}
          to="/register"
          variant="body2"
          sx={{
            display: 'inline-block',
            width: '100%',
            mt: 2,
            color: '#000',
            textAlign: 'center',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}>
          Нет аккаунта? Зарегистрироваться
        </Link>
      </Box>
      {error && (
        <Alert severity="error" sx={{mt: 3, width: '100%'}}>
          {error.error}
        </Alert>
      )}
      {googleError && (
        <Alert severity="error" sx={{mt: 3, width: '100%'}}>
          {googleError.error}
        </Alert>
      )}
    </Box>
  );
};

export default Login;
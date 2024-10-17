import React, {useState} from 'react';
import {Avatar, Box, Grid, TextField, Typography, Link, Alert} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {selectGoogleError, selectGoogleLoading, selectRegisterError, selectRegisterLoading} from './usersSlice';
import {RegisterMutation} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {register} from './usersThunks';
import {LoadingButton} from '@mui/lab';
import LoginWithGoogle from './components/LoginWithGoogle';
import FileInput from '../../UI/FileInput/FileInput';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const registerLoader = useAppSelector(selectRegisterLoading);
  const error = useAppSelector(selectRegisterError);
  const googleLoader = useAppSelector(selectGoogleLoading);
  const googleError = useAppSelector(selectGoogleError);

  const [resetFileName, setResetFileName] = useState(false);
  const [state, setState] = useState<RegisterMutation>({
    email: '',
    displayName: '',
    password: '',
    avatar: null,
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleResetFileName = (status: boolean) => {
    setResetFileName(status);
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (
        state.email.trim().length !== 0 &&
        state.displayName.trim().length !== 0 &&
        state.password.trim().length !== 0 &&
        state.avatar !== null
      ) {
        await dispatch(register(state)).unwrap();
        setResetFileName(true);
        navigate('/');
      }
    } catch (error) {
      console.error('Произошла ошибка при попытке регистрации. Пожалуйста, попробуйте позже. ' + error);
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
        <LockOutlinedIcon fontSize="large"/>
      </Avatar>
      <Typography component="h1" color="#000" variant="h5" sx={{mb: 3}}>
        Регистрация
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
              autoComplete="new-email"
              value={state.email}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('email'))}
              helperText={getFieldError('email')}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              fullWidth
              variant="outlined"
              label="Имя пользователя"
              name="displayName"
              value={state.displayName}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('displayName'))}
              helperText={getFieldError('displayName')}
            />
          </Grid>
          <Grid item>
            <FileInput
              onChange={onChangeFileInput}
              label="Аватарка"
              name="avatar"
              resetFileName={resetFileName}
              handleResetFileName={handleResetFileName}
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
              autoComplete="new-password"
              value={state.password}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('password'))}
              helperText={getFieldError('password')}
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          loadingPosition="start"
          startIcon={<PersonAddIcon/>}
          disabled={
            state.email.trim().length === 0 ||
            state.displayName.trim().length === 0 ||
            state.password.trim().length === 0 ||
            state.avatar === null
          }
          loading={registerLoader || googleLoader}
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
          <span>Регистрация</span>
        </LoadingButton>
        <Box sx={{mt: 3}}>
          <LoginWithGoogle/>
        </Box>
        <Link
          component={RouterLink}
          to="/login"
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
          Уже есть аккаунт? Войти
        </Link>
      </Box>
      {googleError && (
        <Alert severity="error" sx={{mt: 3, width: '100%'}}>
          {googleError.error}
        </Alert>
      )}
    </Box>
  );
};

export default Register;
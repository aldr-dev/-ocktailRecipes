import {createSlice} from '@reduxjs/toolkit';
import {GlobalError, User, ValidationError} from '../../types';
import {googleLogin, login, register} from './usersThunks';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  googleLoading: boolean;
  googleError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  googleLoading: false,
  googleError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, {payload: user}) => {
      state.registerLoading = false;
      state.user = user;
    });
    builder.addCase(register.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, {payload: user}) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(login.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(googleLogin.pending, (state) => {
      state.googleLoading = true;
      state.googleError = null;
    });
    builder.addCase(googleLogin.fulfilled, (state, {payload: user}) => {
      state.googleLoading = false;
      state.user = user;
    });
    builder.addCase(googleLogin.rejected, (state, {payload: error}) => {
      state.googleLoading = false;
      state.googleError = error || null;
    });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectRegisterLoading: (state) => state.registerLoading,
    selectRegisterError: (state) => state.registerError,
    selectLoginLoading: (state) => state.loginLoading,
    selectLoginError: (state) => state.loginError,
    selectGoogleLoading: (state) => state.googleLoading,
    selectGoogleError: (state) => state.googleError,
  },
});

export const usersReducer = usersSlice.reducer;
export const {unsetUser} = usersSlice.actions;

export const {
  selectUser,
  selectRegisterLoading,
  selectRegisterError,
  selectLoginLoading,
  selectLoginError,
  selectGoogleLoading,
  selectGoogleError,
} = usersSlice.selectors;
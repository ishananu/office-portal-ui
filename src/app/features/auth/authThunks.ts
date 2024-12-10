import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  rgisterSuccess
} from './authSlice';
import {
  userLogin,
  userLogOut,
  refreshToken,
  userRegister
} from '../../../dalc/auth';
import Cookies from 'js-cookie';
import { IUser } from '../../type';
import { addToast } from '../toast/toastSlice';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { dispatch }) => {
    try {
      dispatch(loginStart());
      const response = await userLogin(credentials.email, credentials.password);
      dispatch(loginSuccess(response.data));
      localStorage.setItem('token', response.data.token);
      Cookies.set('refresh', response.data.refreshToken, {
        expires: 7,
        path: '/'
      });
    } catch (error: any) {
      console.error('Login failed:', error.message);
      dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
      throw error;
    }
  }
);

// Async thunk for register
export const resgiterUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials: Partial<IUser>, { dispatch }) => {
    try {
      dispatch(loginStart());
      await userRegister(credentials);
      dispatch(rgisterSuccess());
      addToast({
        type: 'success',
        message: 'User registered successfully, please signin',
        duration: 5000
      });
    } catch (error: any) {
      console.error('Resgiter failed:', error.message);
      dispatch(
        loginFailure(error.response?.data?.message || 'Resgiter failed')
      );
      throw error;
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    try {
      await userLogOut();
      localStorage.removeItem('token');
      dispatch(logout());
    } catch (error: any) {
      console.error('Logout failed:', error.message);
    }
  }
);

export const getRefreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { dispatch }) => {
    try {
      const rt = Cookies.get('refresh');
      const response = await refreshToken(rt!);
      dispatch(loginSuccess(response.data));
      localStorage.setItem('token', response.data.token);
    } catch (error: any) {
      console.error('Refresh Token request failed:', error.message);
    }
  }
);

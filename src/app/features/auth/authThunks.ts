import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginStart, loginSuccess, loginFailure, logout } from './authSlice';
import { userLogin, userLogOut, refreshToken } from '../../../dalc/auth';
import Cookies from 'js-cookie';

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
      dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
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

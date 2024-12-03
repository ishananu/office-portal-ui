import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginStart, loginSuccess, loginFailure, logout } from './authSlice';
import { userLogin, userLogOut } from '../../../dalc/auth';
// import { redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { dispatch }) => {
    try {
      dispatch(loginStart());
      const response = await userLogin(credentials.email, credentials.password);
      dispatch(loginSuccess(response.data));
      Cookies.set('jwt', response.data.token, { expires: 7, path: '/' });
      // redirect('/dashboard');
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
      dispatch(logout());
    } catch (error: any) {
      console.error('Logout failed:', error.message);
    }
  }
);

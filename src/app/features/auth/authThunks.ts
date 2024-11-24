import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginStart, loginSuccess, loginFailure, logout } from './authSlice';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { dispatch }) => {
    try {
      dispatch(loginStart());
      const response = await axios.post('/api/login', credentials);
      const { user, token } = response.data;

      dispatch(loginSuccess({ user, token }));
      return { user, token };
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
      await axios.post('/api/logout');
      dispatch(logout());
    } catch (error: any) {
      console.error('Logout failed:', error.message);
    }
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setUsers } from './userSlice';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { dispatch }) => {
    const response = await axios.get('/api/users');
    dispatch(setUsers(response.data));
  }
);

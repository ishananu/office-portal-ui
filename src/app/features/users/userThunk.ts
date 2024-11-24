import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setUsers } from './userSlice';
import { getEmployeeList } from '../../../dalc/users';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number, { dispatch }) => {
    const response = await getEmployeeList(page);
    dispatch(setUsers(response.data));
  }
);

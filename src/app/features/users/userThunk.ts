import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUsers, updateUser, addUser } from './userSlice';
import {
  getEmployeeList,
  updateEmployee,
  addEmployee
} from '../../../dalc/users';
import { IUser } from '../../type';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number, { dispatch }) => {
    const response = await getEmployeeList(page);
    dispatch(setUsers(response.data));
  }
);

export const editUser = createAsyncThunk(
  'users/updateUser',
  async (userData: Partial<IUser>, { dispatch }) => {
    const response = await updateEmployee(userData);
    dispatch(updateUser(response.data));
  }
);

export const postUser = createAsyncThunk(
  'users/addsUer',
  async (userData: Partial<IUser>, { dispatch }) => {
    const response = await addEmployee(userData);
    dispatch(addUser(response.data));
  }
);

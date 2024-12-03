import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUsers, updateUser, addUser, removeUser } from './userSlice';
import {
  getEmployeeList,
  updateEmployee,
  addEmployee,
  deleteEmployee
} from '../../../dalc/users';
import { IUser } from '../../type';
import { addToast } from '../toast/toastSlice';

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
    dispatch(
      addToast({
        type: 'success',
        message: 'Operation was successful!',
        duration: 3000
      })
    );
  }
);

export const deletetUser = createAsyncThunk(
  'users/deletetUser',
  async (userId: string, { dispatch }) => {
    await deleteEmployee(userId);
    dispatch(removeUser(userId));
  }
);

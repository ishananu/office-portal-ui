import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../type';

interface UsersState {
  list: IUser[];
}

const initialState: UsersState = {
  list: []
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<IUser[]>) {
      state.list = [...state.list, ...action.payload];
    },
    addUser(state, action: PayloadAction<IUser>) {
      state.list.push(action.payload);
    },
    removeUser(state, action: PayloadAction<string>) {
      state.list = state.list.filter((user) => user._id !== action.payload);
    },
    updateUser(state, action: PayloadAction<IUser>) {
      const index = state.list.findIndex(
        (user) => user._id === action.payload._id
      );
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    }
  }
});

export const { setUsers, addUser, removeUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;

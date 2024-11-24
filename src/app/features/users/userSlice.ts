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
      state.list = state.list.filter((user) => user.id !== action.payload);
    }
  }
});

export const { setUsers, addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;

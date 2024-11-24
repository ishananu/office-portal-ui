import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UsersState {
  list: User[];
}

const initialState: UsersState = {
  list: []
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.list = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.list.push(action.payload);
    },
    removeUser(state, action: PayloadAction<string>) {
      state.list = state.list.filter((user) => user.id !== action.payload);
    }
  }
});

export const { setUsers, addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILogin, IUser } from '../../type';

interface AuthState {
  user: ILogin;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: { token: '', name: '', id: '', refreshToken: '' },
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<ILogin>) {
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = { token: '', name: '', id: '', refreshToken: '' };
      state.error = null;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;

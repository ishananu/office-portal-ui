import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: string | null; // The username or user ID
  token: string | null; // JWT or session token
  loading: boolean; // Indicates whether an authentication request is in progress
  error: string | null; // Stores error messages
}

const initialState: AuthState = {
  user: null,
  token: null,
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
    loginSuccess(
      state,
      action: PayloadAction<{ user: string; token: string }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;

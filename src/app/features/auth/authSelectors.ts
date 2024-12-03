import { RootState } from '../../store/redux-store';

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectAuthToken = (state: RootState) => state.auth.user;

export const selectAuthLoading = (state: RootState) => state.auth.loading;

export const selectAuthError = (state: RootState) => state.auth.error;

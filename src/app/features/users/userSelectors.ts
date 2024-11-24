import { RootState } from '../../store';

// Select the logged-in user's details
export const selectUser = (state: RootState) => state.auth.user;

// Check if the user is authenticated
export const selectIsAuthenticated = (state: RootState) => !!state.auth.user;

// Select the authentication error
export const selectAuthError = (state: RootState) => state.auth.error;

// Select the authentication loading state
export const selectAuthLoading = (state: RootState) => state.auth.loading;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/userSlice';
import productsReducer from '../features/products/productSlice';
import booksReducer from '../features/books/bookSlice';
import toastReducer from '../features/toast/toastSlice';
import localizationReducer from '../features/localization/localizationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    products: productsReducer,
    books: booksReducer,
    toast: toastReducer,
    localization: localizationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

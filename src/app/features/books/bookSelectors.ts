import { RootState } from '../../store';

export const selectBooks = (state: RootState) => state.books.books;
export const selectBooksLoading = (state: RootState) => state.books.loading;
export const selectBooksError = (state: RootState) => state.books.error;

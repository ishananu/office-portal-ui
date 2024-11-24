import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure
} from './bookSlice';

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { dispatch }) => {
    try {
      dispatch(fetchBooksStart());
      const response = await axios.get('/api/books');
      dispatch(fetchBooksSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchBooksFailure(error.message));
    }
  }
);

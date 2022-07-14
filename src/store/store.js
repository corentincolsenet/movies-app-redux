import { configureStore } from '@reduxjs/toolkit';
import { moviesSlice } from '../reducers/redux';

export const store = configureStore({
    reducer: {
        movies: moviesSlice.reducer
    }
});
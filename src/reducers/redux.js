import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movies$ } from "../data/movies.js";

const initialState = {
    movies: [],
    status: 'idle',
    currentPage: 1,
    moviesPerPage: 4,
    categories: [],
    selectedCategory: "all"
};

export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        likeMovie: (state, action) => {
            const movie = state.movies.find(m => m.id === action.payload);
            if (movie.liked)
                movie.likes -= 1;
            else if (movie.disliked) {
                movie.dislikes -= 1;
                movie.likes += 1;
                movie.disliked = !movie.disliked;
            } else
                movie.likes += 1;
            movie.liked = !movie.liked;
        },
        dislikeMovie: (state, action) => {
            const movie = state.movies.find(m => m.id === action.payload);
            if (movie.disliked)
                movie.dislikes -= 1;
            else if (movie.liked) {
                movie.likes -= 1;
                movie.dislikes += 1;
                movie.liked = !movie.liked;
            }
            else
                movie.dislikes += 1;
            movie.disliked = !movie.disliked;
        },
        deleteMovie: (state, action) => {
            state.movies = state.movies.filter(m => m.id !== action.payload);
            state.categories = state.movies.map(movie => movie.category);
        },
        filter: (state, action) => {
            state.currentPage = 1;
            state.selectedCategory = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setMoviesPerPage: (state, action) => {
            state.moviesPerPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchMovies.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchMovies.fulfilled, (state, action) => {
            state.status = 'idle';
            state.movies = action.payload;
            state.categories = state.movies.map(movie => movie.category);
          })
    },
});

export const fetchMovies = createAsyncThunk('movies/initMovies',
    async () => {
        const response = await movies$;
        return response;
    }
);

export const { likeMovie, dislikeMovie, deleteMovie, filter, setCurrentPage, setMoviesPerPage } = moviesSlice.actions;
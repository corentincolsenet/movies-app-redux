import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./reducers/redux";

import Filter from './components/Filter';
import Movies from './components/Movies';
import Pagination from './components/Pagination';

const App = () => {
    const dispatch = useDispatch();
    const { movies, status } = useSelector(state => state.movies);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [])

    return (
        <>
            {!movies.length ? (
                <div className="flex flex-col justify-center items-center w-full h-screen">
                    <p className="text-md opacity-60">
                        {status === "idle" ? "No movies" : "Loading movies..."}
                    </p>
                </div>
            ) : (
                <div className="flex flex-col space-y-12 w-full h-full p-4">
                    <Filter />
                    <Movies />
                    <Pagination />
                </div>
            )}
        </>
    );
}

export default App;

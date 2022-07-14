import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../reducers/redux";
import Movie from "./Movie";

const Movies = () => {
    const dispatch = useDispatch();
    const { movies, selectedCategory, currentPage, moviesPerPage } = useSelector(state => state.movies);
    const filterMovies = selectedCategory !== "all" ? (
        movies.filter(m => m.category === selectedCategory)
    ) : (
        movies
    )

    useEffect(() => {
        // select 'all' when a specific category has no more movies
        if (!filterMovies.length)
            dispatch(filter('all'))
    }, [filterMovies])

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const moviesToDisplay = filterMovies.slice(indexOfFirstMovie, indexOfLastMovie);
    
    return (
        <div className="flex flex-wrap items-center justify-center gap-3 gap-y-12 px-8 md:px-0">
            {moviesToDisplay.map((movie) => (
                <Movie 
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    category={movie.category}
                    likes={movie.likes}
                    dislikes={movie.dislikes}
                    liked={movie.liked}
                    disliked={movie.disliked}
                    src={movie.src}
                />
            ))}
        </div>
    )
}

export default Movies;
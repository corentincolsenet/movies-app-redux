import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, setMoviesPerPage } from "../reducers/redux";

const Filter = () => {
    const dispatch = useDispatch();
    const { categories, selectedCategory } = useSelector(state => state.movies);
    const categoryList = [];
    const moviesToDisplay = [4, 8, 12];

    for (const category of categories) {
        if (!categoryList.includes(category))
            categoryList.push(category);
    }

    useEffect(() => {

    }, [selectedCategory])

    return (
        <div className="flex md:space-x-8 items-center justify-between md:justify-start">
            {/* Categories filter */}
            <div className="flex flex-col justify-center">
                <label htmlFor="categories" className="mb-2 text-sm font-medium text-gray-900">Select a category</label>
                <select
                    id="categories"
                    className="bg-gray-50 border border-gray-300 text-gray-900 w-32 md:w-52 p-3 text-sm rounded-lg focus:outline-none"
                    onChange={(e) => dispatch(filter(e.target.value)) }
                >
                    <option value="all">All</option>
                    {categoryList.map((category, categoryIndex) => (
                        <option key={categoryIndex} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {/* Number of movie displayed filter */}
            <div className="flex flex-col justify-center">
                <label htmlFor="numberOfMovies" className="mb-2 text-sm font-medium text-gray-900">Number of movie</label>
                <select
                    id="numberOfMovies"
                    className="bg-gray-50 border border-gray-300 text-gray-900 w-24 md:w-32 p-3 text-sm rounded-lg focus:outline-none"
                    onChange={(e) => dispatch(setMoviesPerPage(e.target.value))}
                >
                    {moviesToDisplay.map((movie, movieIndex) => (
                        <option key={movieIndex} value={movie}>{movie}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Filter;
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../reducers/redux";

const Pagination = () => {
    const dispatch = useDispatch();
    const { moviesPerPage, movies, currentPage, selectedCategory } = useSelector(state => state.movies);
    const pageNumbers = [];
    const totalMovies = selectedCategory !== "all" ? (
        movies.filter(m => m.category === selectedCategory)
    ).length : (
        movies
    ).length

    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++)
        pageNumbers.push(i);

    const onChangePage = (newPage) => {
        if (newPage <= pageNumbers.length && newPage >= 1)
            dispatch(setCurrentPage(newPage));
    }

    return (
        <div className="flex bg-white rounded-lg">
            {/* // previous page */}
            <button 
                onClick={() => onChangePage(currentPage - 1)}
                className={`${currentPage - 1 < 1 ? 'cursor-default opacity-40' : 'hover:bg-indigo-600 hover:text-white'} h-12 border-2 border-r-0 border-indigo-600 px-4 rounded-l-lg`}
            >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
            </button>

            <ul className="flex flex-row">
                {pageNumbers.map((page, pageIndex) => (
                        <li
                            key={pageIndex}
                            onClick={() => dispatch(setCurrentPage(page))}
                            className={`flex flex-col items-center justify-center w-12 h-12 border-2 border-r-0 border-indigo-600 cursor-pointer ${currentPage === page && 'bg-indigo-600 text-white'}`}
                        >
                            {page}
                        </li>
                    ))
                }
            </ul>

            {/* next page */}
            <button
                onClick={() => onChangePage(currentPage + 1)}
                className={`${currentPage + 1 > pageNumbers.length ? 'cursor-default opacity-40 border-l-0' : 'hover:bg-indigo-600 hover:text-white'} h-12 border-2 border-indigo-600 px-4 rounded-r-lg`}
            >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
            </button>
        </div>
    )
}

export default Pagination;
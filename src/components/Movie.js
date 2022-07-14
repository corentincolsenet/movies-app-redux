import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { likeMovie, dislikeMovie, deleteMovie } from "../reducers/redux";
import { AiFillLike, AiOutlineLike, AiFillDislike, AiOutlineDislike } from "react-icons/ai";

const Movie = ({ id, title, category, likes, dislikes, liked, disliked, src }) => {
    const dispatch = useDispatch();

    return (
        <div className="relative max-w-xs mx-auto min-w-0 break-words bg-white w-full shadow-xl rounded-xl">
            <div className="flex flex-col space-y-8 p-4">
                <div className="relative -mt-6 flex justify-center">
                    <img
                        className="w-2/3 rounded-lg"
                        src={src}
                        alt={title}
                    />
                </div>
                <div className="flex flex-col space-y-2 justify-center">
                    <h1 className="font-bold text-lg">{title}</h1>
                    <h3 className="opacity-60 font-medium italic text-sm">
                        Category: {category}
                    </h3>
                    <div className="flex items-center justify-between px-4 text-sm pt-4">
                        <div className="flex space-x-4 items-center">
                            <div className="flex space-x-1 items-center">
                                <button
                                    type="button"
                                    onClick={() => dispatch(likeMovie(id))}
                                >
                                    {liked ? (
                                        <AiFillLike className="w-4 h-4 cursor-pointer" />
                                    ) : (
                                        <AiOutlineLike className="w-4 h-4 cursor-pointer" />
                                    )}
                                </button>
                                <p className="font-light">{likes}</p>
                            </div>
                            <div className="flex space-x-1 items-center">
                                <button
                                    type="button"
                                    onClick={() => dispatch(dislikeMovie(id))}
                                >
                                    {disliked ? (
                                            <AiFillDislike className="w-4 h-4" />
                                    ) : (
                                        <AiOutlineDislike className="w-4 h-4" />
                                    )}
                                </button>
                                <p className="font-light">{dislikes}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => dispatch(deleteMovie(id))}
                            className="bg-red-400 px-4 py-2 hover:bg-red-600 rounded-lg w-24 self-end"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

Movie.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
    liked: PropTypes.bool.isRequired,
    disliked: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired
}

export default Movie;
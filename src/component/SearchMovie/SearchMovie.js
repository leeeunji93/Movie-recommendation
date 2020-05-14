import React from "react";
import PropTypes from "prop-types";


function SearchMovie({id, title, poster, director, actor}) {
    return (
        <div className='movie'>
            <img
                src={poster}
                alt={title}
                title={title}/>
            <h2 className='movie_data'>{
                title.replace(/<b>/gi, '').replace(/<\/b>/gi, '')
            }
            </h2>
            <p className='movie_director'>
                {director}
            </p>
            <p className='actor'>
                {actor}
            </p>


        </div>

    )
};

SearchMovie.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    actor: PropTypes.string.isRequired
};
export default SearchMovie;
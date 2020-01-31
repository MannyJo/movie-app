import React from 'react';
import Movie from '../Movie/Movie';

const MovieList = (props) => {
    return (
        <div>
            {props.movieList.map(movie => <Movie key={movie.id} movie={movie} />)}
        </div>
    )
}

export default MovieList;
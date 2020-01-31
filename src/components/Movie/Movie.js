import React from 'react';
import { MOVIE_DB_IMAGE_URL } from '../../api/movieApi';

const Movie = ({ movie }) => {
    return (
        <div key={movie.id}>
            {movie.title}<br />
            <a href={`/detail/${movie.id}`}>
                <img src={MOVIE_DB_IMAGE_URL.small+movie.poster_path} alt={movie.title} />
            </a>
        </div>
    )
}

export default Movie;
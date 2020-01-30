import React, { useState, useEffect, useReducer } from 'react';
import { MOVIE_DB_IMAGE_URL } from '../../api/movieApi';
import { movieApiAxios as axios } from '../../axios';
import { movieParam } from '../../config';

const Main = (props) => {
    const DEFAULT_CATEGORY = 'popular';
    const DEFAULT_PAGE = 1;
    const [category, setCategory] = useState(DEFAULT_CATEGORY);
    const [page, setPage] = useState(DEFAULT_PAGE);
    const [totalPages, setTotalPages] = useState(DEFAULT_PAGE);
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        getMovies();
    }, [ category, page ])

    useEffect(() => {
        getMovies('search')
    }, [ props.searchText ])

    const getMovies = filter => {
        let path = '';
        let config = {
            params: {
                ...movieParam,
                page
            }
        };

        if(filter === 'search' && props.searchText.length > 0) {
            path = '/search/movie';
            config.params = {
                ...config.params,
                query: props.searchText
            }
        } else {
            path = `/movie/${category}`;
        }

        axios.get(path, config)
        .then(results => {
            if(totalPages !== results.data.total_pages)
                setTotalPages(results.data.total_pages);
            setMovieList(results.data.results);
        }).catch(err => {
            console.log('Error with getting movies :', err);
        });
    }

    const handleClickCategory = filter => e => {
        setPage(DEFAULT_PAGE);
        setCategory(filter || DEFAULT_CATEGORY);
    }

    const nextPage = () => {
        setPage(page+1 > totalPages ? totalPages : page+1);
    }

    const prevPage = () => {
        setPage(page-1 < 1 ? DEFAULT_PAGE : page-1);
    }

    return (
        <div>
            <div>
                <button onClick={handleClickCategory('popular')}>Popular</button>
                <button onClick={handleClickCategory('now_playing')}>Now Playing</button>
                <button onClick={handleClickCategory('top_rated')}>Top Rated</button>
                <button onClick={handleClickCategory('upcoming')}>Upcoming</button>
            </div>
            <div>
                {
                    movieList.map((movie, i) => (
                        <div key={i}>
                            {movie.title}<br />
                            <a href={`/detail/${movie.id}`}>
                                <img src={MOVIE_DB_IMAGE_URL.small+movie.poster_path} alt={movie.title} />
                            </a>
                        </div>
                    ))
                }
            </div>
            <div>
                <button onClick={prevPage}>Prev</button>
                <div>{totalPages}</div>
                <button onClick={nextPage}>Next</button>
            </div>
        </div>
    );
}

export default Main;
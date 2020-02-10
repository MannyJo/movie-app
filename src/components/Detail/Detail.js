import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieParam } from '../../config';
import { MOVIE_DB_IMAGE_URL } from '../../api/movieApi';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { serverAxios, movieApiAxios } from '../../axios';

const Detail = ({ token, setToken }) => {
    const { id } = useParams();
    const [detail, setDetail] = useState({});
    const [watchlistBtn, setWatchlistBtn] = useState('');

    useEffect(() => {
        movieApiAxios.get(`/movie/${id}`, { params: movieParam })
        .then(results => {
            setDetail(results.data);
        }).catch(err => {
            console.error('Error with getting movie detail :', err);
        });

        serverAxios.get(`/api/watchlist/${id}`)
        .then(results => {
            if(results.data.is_exist === true) {
                console.log('exist')
                setWatchlistBtn('exist')
            } else {
                console.log('not exist')
            }
        }).catch(err => {
            console.error('Error with getting watchlist status :', err);
        })
    }, [ id ])

    const numberToMoney = moneyStr => {
        if(moneyStr) {
            let money = Number.parseInt(moneyStr);
            return '$' + money.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
        return '$0';
    }

    const addToMyWatchlist = movie_id => e => {
        serverAxios.post(`/api/watchlist/add/`, { movie_id })
        .then(results => {
            console.log(results.data.response)
            if(results.data.is_added === true) {
                setWatchlistBtn('exist');
            }
        }).catch(err => {
            if(err.response.status === 401) {
                window.location.pathname = '/auth'
            } else {
                console.error(err)
            }
        })
    }

    return (
        <div className="movie-detail-container">
            <div className="movie-detail-img">
                <img src={MOVIE_DB_IMAGE_URL.small+detail.poster_path} alt={detail.title} />
            </div>
            <div className="movie-detail-info">
                <div className="movie-detail-basic-info">
                    <div className="movie-detail-rate">
                        {detail.vote_average}
                    </div>
                    <div className="movie-detail-title">
                        {detail.title}
                    </div>
                    <p>
                        {detail.tagline}
                    </p>
                    <div>
                        <button 
                            onClick={addToMyWatchlist(detail.id)} 
                            className={`movie-detail-watchlist-btn ${watchlistBtn}`}
                            disabled={watchlistBtn === 'exist' ? true : false}
                        >
                            <BookmarkBorderIcon />
                            <span>Add to my Watchlist</span>
                        </button>
                    </div>
                    <p className="movie-detail-overview">
                        {detail.overview}
                    </p>
                    <div>
                        <span>Genres : </span>
                        {detail.genres && detail.genres.map(genre => <span className="movie-detail-genre" key={genre.id}>{genre.name}</span>)}
                    </div>
                </div>
                <div className="movie-detail-add-info">
                    <div>
                        Release Date : {detail.release_date}
                    </div>
                    <div>
                        Runtime : {detail.runtime} mins
                    </div>
                    <div>
                        Budget : {numberToMoney(detail.budget)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;
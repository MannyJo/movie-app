import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieApiAxios as axios } from '../../axios';
import { movieParam } from '../../config';
import { MOVIE_DB_IMAGE_URL } from '../../api/movieApi';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const Detail = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState({});

    useEffect(() => {
        axios.get(`/movie/${id}`, { params: movieParam })
        .then(results => {
            setDetail(results.data);
        }).catch(err => {
            console.log('Error with getting movie detail :', err);
        })
    }, [ id ])

    const numberToMoney = moneyStr => {
        if(moneyStr) {
            let money = Number.parseInt(moneyStr);
            return '$' + money.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
        return '$0';
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
                        <button className="movie-detail-watchlist-btn">
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
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieApiAxios as axios } from '../../axios';
import { movieParam } from '../../config';
import { MOVIE_DB_IMAGE_URL } from '../../api/movieApi';

const Detail = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState({});

    useEffect(() => {
        console.log('detail');
        axios.get(`/movie/${id}`, { params: movieParam })
        .then(results => {
            setDetail(results.data);
            console.log(typeof results.data.genres)
            for(let genre of results.data.genres){
                console.log(genre);
            }
        }).catch(err => {
            console.log('Error with getting movie detail :', err);
        })
    }, [ id ])

    return (
        <div>
            <div>
                <img src={MOVIE_DB_IMAGE_URL.small+detail.poster_path} alt={detail.title} />
            </div>
            <div>
                {detail.vote_average}
            </div>
            <div>
                {detail.title}
            </div>
            <div>
                {detail.tagline}
            </div>
            <div>
                {detail.title}
            </div>
            <div>
                {detail.overview}
            </div>
            <div>
                {detail.genres && detail.genres.map(genre => <span key={genre.id}>{genre.name} </span>)}
            </div>
            <div>
                {detail.release_date}
            </div>
            <div>
                {detail.runtime} mins
            </div>
            <div>
                {detail.budget}
            </div>
        </div>
    )
}

export default Detail;
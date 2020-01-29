import axios from 'axios';

export const movieApiAxios = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});
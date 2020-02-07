import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const movieApiAxios = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export const serverAxios = axios.create({
    baseURL: 'http://localhost:8000'
});
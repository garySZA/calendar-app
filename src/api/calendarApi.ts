import axios, { AxiosHeaders, AxiosInstance } from 'axios';
import { config } from '../config';

const calendarApi: AxiosInstance = axios.create({
    baseURL: config.api.api_url
});

//* Interceptores
calendarApi.interceptors.request.use( config => {
    config.headers['x-token'] = localStorage.getItem('token') || '';
    return config
} )

export default calendarApi
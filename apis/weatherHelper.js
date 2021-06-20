import axios from 'axios';
import {key} from './weatherKey';

const server = axios.create({
    baseURL : 'https://api.openweathermap.org/data/2.5/weather',
});


server.interceptors.request.use(
    async(config) => {
        config.headers.accept= 'application/json';
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);




export const getWeather = async (callback, zip) => {
    
    const response = await server.get(
        `?zip=${zip},us&appid=${key}&units=imperial`
    );
    console.log('returning conditions', response.data);
    callback(response.data);
    
}


export default server;
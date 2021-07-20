'use strict';
require('dotenv').config()

const config = {
    port                   : process.env.PORT || 3000,
    weatherKey             : process.env.OPNWEATHERKEY || '<INSERT-WHEATHER-API-KEY>',
    currentWeatherApiUrl   : 'https://api.openweathermap.org/data/2.5/weather',
    fiveDaysForecastApiUrl : 'https://api.openweathermap.org/data/2.5/forecast',
    ipApiFiels             : 'status,message,country,city,regionName,lat,lon',
    ipApiUrl               : "http://ip-api.com/json/"
};

module.exports = config;
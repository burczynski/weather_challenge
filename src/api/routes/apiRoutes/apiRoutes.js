'use strict';
const { Ip }         = require('../../../classes/ip/Ip');
const { Weather }    = require('../../../classes/weather/Weather');
const { weatherKey } = require('../../../config');
const { AppError }   = require('../../../utils/appError');
const { Router }     = require('express');
const router         = Router();
let weather          = new Weather(weatherKey);

// v1 routes
    router.get('/location', async (req, res, next) => {
        if (typeof req.socket.remoteAddress !== 'string') throw new AppError(`Ip adress must be string, ${typeof req} given`, 422);
        try {            
            let location = await Ip.getLocation(req.socket.remoteAddress);
            res.json(location);    
        } catch (error) {
            next(error);
        }
        
    });

    router.get('/current/:city?', async (req, res, next) => {
        if (typeof req !== 'object') throw new AppError(`req must be object, ${typeof req} given`, 422);
        let currentForecast = 1;
        try {
            let curentWeather = await weather.getWeatherData(req, currentForecast);
            res.json(curentWeather);
        } catch (error) {
            next(error);
        }
        
    });

    router.get('/forecast/:city?', async (req, res, next) => {
        if (typeof req !== 'object') throw new AppError(`req must be object, ${typeof req} given`, 422);
        let fiveDaysForecast = 5;
        try {
            let fiveDaysWeather = await weather.getWeatherData(req, fiveDaysForecast);
            res.json(fiveDaysWeather);
        } catch (error) {
            next(error);
        }
        
    });
// end v1 routes

module.exports = router;
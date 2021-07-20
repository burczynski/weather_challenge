'use strict';
const { currentWeatherApiUrl, fiveDaysForecastApiUrl } = require('../../config');
const { AppError } = require('../../utils/appError');
const { Ip }      = require('../ip/Ip');
const { Request } = require('../request/Request');

/**
 * Create new Weather instance
 * @class
 * @param {String} key - key from Open Weather Map's API
 */
class Weather {
    constructor(key) {
        if (typeof key !== 'string') throw new AppError(`key must be string, ${typeof key} given`, 500);
        this.key = key;
    }

    /**
     * @param {Request} req - object from an endPoint
     * @param {number} forecastDays - number of days to get forecast 
     */
    async getWeatherData(req, forecastDays) {
        if (typeof req !== 'object' && typeof forecastDays !== 'number') throw new AppError(`Parameters must be object and number, ${typeof req} and ${typeof forecastDays} given`, 500);
        let city, location, weatherData, data={};
        try {
            if (req.params.city) {
                city = req.params.city;
            } else {
                if(typeof req.socket.remoteAddress !== 'string' || req.socket.remoteAddress == '::ffff:127.0.0.1') throw new AppError (`Ip ${req.socket.remoteAddress} type ${typeof req.socket.remoteAddress} can't be request`, 200);
                location = await Ip.getLocation(req.socket.remoteAddress);
                city = location.city;
                data.coord = location.coord; 
            }
    
            switch (forecastDays) {
                case 1:
                    weatherData = await this.getCurrentWeatherByCity(city);
                    if (!data.coord) data.coord = weatherData.coord;                     
                    data.forecast = weatherData.main;
                    break;
                case 5:
                    weatherData = await this.getFiveDaysForecastWeatherByCity(city);
                    if (!data.coord) data.coord = weatherData.city.coord;
                    data.forecast = weatherData.list;
                break;
                default:
                    break;
            }
            return data;
        } catch (error) {
            throw error;
        }        
    }

    /**
     * @param {String} city - name of a city
     */
    async getCurrentWeatherByCity(city) {
        if (typeof city !== 'string') throw new AppError(`Parameter must be string, ${typeof city} given`, 500);
        try {
            return await Request.get(`${currentWeatherApiUrl}?q=${city}&appid=${this.key}&units=metric&lang=es`);
        } catch (error) {            
            throw error;
        }
        
    }

    /**
     * @param {String} city - name of a city
     */    
    async getFiveDaysForecastWeatherByCity(city) {
        if (typeof city !== 'string' ) throw new AppError(`Parameter must be string, ${typeof city} given`, 500);
        try {
            return await Request.get(`${fiveDaysForecastApiUrl}?q=${city}&appid=${this.key}&units=metric&lang=es`);
        } catch (error) {
            throw error;
        }
        
    }
}

module.exports = { Weather };
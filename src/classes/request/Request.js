'use strict';
const axios        = require('axios');
const { AppError } = require('../../utils/appError');

/**
 * Create new Weather instance
 * @class
 */
class Request {
    constructor() {}

    /**
     * do get request
     * @param {String} url - any url to be request 
     */
    static async get(url) {
        if (typeof url !== 'string') throw new AppError(`url must be string, ${typeof url} given`, 500);
        try{
            let response = await axios.get(url);

            if (response.data) return response.data;            

            throw new AppError(`Request to ${url} fail`, 404);
        } catch (error) {
            if (error.isAxiosError == true) {
                throw new AppError(error.response.data.message, error.response.data.code);
            } else {
                throw error;
            }
            
        }        
    }
}
module.exports = { Request };
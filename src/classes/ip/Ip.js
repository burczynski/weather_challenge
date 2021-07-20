'use strict';
const axios = require('axios');
const {Request} = require('../request/Request');
const { ipApiFiels, ipApiUrl } = require('../../config');
const { AppError } = require('../../utils/appError');

/**
 * Create new Ip instance to work with ip-api
 * @class
 */
class Ip {

    constructor() {}

    /**
     * @param {String} ipAdress - ipv6 ip adress format
     */
    static async getLocation(ipAdress) {
        if (typeof ipAdress !== 'string') throw new AppError(`Ip adress must be string, ${typeof ipAdress} given`, 500);
        try {
            return await Request.get(`${ipApiUrl}${ipAdress}?fields=${ipApiFiels}`);
        } catch (error) {
            throw error;
        }
        
    }
}

module.exports = { Ip };
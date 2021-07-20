'use strict';
const apiRoutes    = require('../api/routes/apiRoutes/apiRoutes');
const express      = require('express');
const helmet       = require('helmet');
const cors         = require('cors');
const { AppError } = require('../utils/appError');
const errorHandler = require('../utils/errorHandler');
const app          = express();

//middlewares
app.use(cors());
app.use(helmet());


// set routes
app.use('/v1', apiRoutes);

// unmatched routes
app.all('*', (req, res, next) => {
  throw new AppError(`Requested Url ${req.path} not found`, 404);
});

// error handler, always at the end
app.use(errorHandler);

module.exports = app;
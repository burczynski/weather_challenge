'use strict';
const config = require('../config');
const port   = config.port;
const app    = require('./app');

app.listen(port, () => {
    console.log(`server on port ${port}`);
});

module.exports = app;
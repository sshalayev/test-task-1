'use strict';

global.config = require('./config');
global.Sequelize = require('sequelize');
var express = require('express');

// Connect to database
global.db = new Sequelize(config.database.name, config.database.username, config.database.password, {
    host: config.database.host,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: true,
        underscored: true
    }
});

require('./config/models')
    .then(function() {

        if (config.local) {

            console.log('Database models are synced');
        }
    });

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

var port = normalizePort(config.port);

// Setup server
var app = express();
app.set('port', port);
var server = require('http').createServer(app);
require('./config/express')(app);
require('./config/routes')(app);

/**
 * Event listener for HTTP server "error" event.
 */
server.on('error', function onError(error) {

    if (error.syscall !== 'listen') {
        console.log('HTTP server error: ', error);
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});

/**
 * Event listener for HTTP server "listening" event.
 */
server.on('listening', function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
});

// Start server
server.listen(config.port, config.ip);

// Expose app
exports = module.exports = app;
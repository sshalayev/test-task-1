"use strict";

var path = require('path');

var config = {

    // Root path of server
    root: path.normalize(__dirname + '/../..'),

    // Is local
    local: process.env.OPENSHIFT_APP_DNS ? false : true,

    // Server IP
    ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined,

    // Server port
    port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000,

    // Current domain
    domain: process.env.OPENSHIFT_APP_DNS || 'localhost:3000',

    // Database cofig
    database: {
        name: 'tags',
        username: process.env.OPENSHIFT_POSTGRESQL_DB_USERNAME || 'adminjpaah8c',
        password: process.env.OPENSHIFT_POSTGRESQL_DB_PASSWORD || 'Pnihfk6mj6bG',
        host: process.env.OPENSHIFT_POSTGRESQL_DB_HOST || 'localhost'
    },

    // Body parser options
    bodyParser: {
        limit: '5mb'
    },

    // Allowed user roles
    roles: [
        'admin',
        'user'
    ],

    // If true then all tables are will refreshed
    resetDb: false
};

module.exports = config;
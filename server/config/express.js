'use strict';

var config = require('./index');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


module.exports = function(app) {
    
    if (config.local) {
        app.use(require('morgan')('dev')); // Colored log
    }

    if (!config.local) {
        app.set('trust proxy', 1); // trust first proxy
    }

    // Server-side views configuration
    app.set('views', path.join(config.root, 'server', 'views'));
    app.set('view engine', 'hjs');
    app.engine('html', require('hjs').renderFile);

    app.use(bodyParser.json(config.bodyParser || {}));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(methodOverride());

    // Full path to app 
    app.set('appPath', path.join(config.root, 'frontend'));

    // Handle index page
    var router = express.Router();
    router.get('/', require('./index.page.js')(app));
    app.use('/', router);

    // Etc static content
    app.use(express.static(app.get('appPath')));

    if (config.local) {
        app.use(require('errorhandler')());
    }
};

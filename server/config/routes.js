'use strict';

var config = require('./index');
var utils = require('../components/utils');

module.exports = function(app) {
    // Insert API routes below
    app.use('/api/user', require('../api/user'));
    app.use('/api/project', require('../api/project'));
    app.use('/api/team', require('../api/team'));
    app.use('/api/member', require('../api/teammember'));
    app.use('/api/tag', require('../api/tag'));

    // !!! Do not change routes below

    // All undefined asset, stylesheets or api routes should return a 404
    app.route('/:url(api|assets|css)/*')
        .all(function pageNotFound(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

    // All other routes should redirect to the index.html
    app.route('/*')
        .all(require('./index.page.js')(app));

    // Error handler
    app.use(function(err, req, res, next) {
        utils.handleError(err, res, !config.local);
    });
};
'use strict';

var path = require('path');

module.exports = function(app) {
    var appPath = app.get('appPath');

    return function(req, res) {
        res.render(path.join(appPath, 'index.html'), {
            title: 'Tags'
        });
    };
};
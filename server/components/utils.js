"use strict";

var config = require('../config');

/**
 * Parse error and send response
 * @param {Object} err
 * @param {Object} res
 * @param {Boolean} isProduction
 */
module.exports.handleError = function(err, res, isProduction) {
    var response = {
        status: 500,
        message: 'Internal Server Error'
    };

    if (typeof err === 'string') {
        err = new Error(err);
    }

    if (err instanceof Error) {
        switch (String(err.message).toLowerCase()) {
            case '400':
            case 'bad request':
                response.status = 400;
                response.message = 'Bad Request';
                break;

            case '403':
            case 'forbidden':
                response.status = 403;
                response.message = 'Forbidden';
                break;

            case '406':
            case 'not acceptable':
                response.status = 406;
                response.message = 'Not Acceptable';
                break;

            case '401':
            case 'unauthorized':
                response.status = 401;
                response.message = 'Unauthorized';
                break;

            case '404':
            case 'not found':
                response.status = 404;
                response.message = 'Not Found';
                break;

            case '405':
            case 'method not allowed':
                response.status = 405;
                response.message = 'Method Not Allowed';
                break;

            default:
                response.status = 500;
                response.message = err.message || 'Internal Server Error';
                break;
        }
    } else {
        response.status = err.status || 500;
        response.message = err.message;
    }

    if (isProduction) {
        res.status(response.status)[typeof  response.message === 'object' ? 'json' : 'send'](response.message);
    } else {
        res.status(response.status);

        if (typeof  response.message === 'object') {
            res.json(response.message);
        } else {
            res.render('error', {
                message: response.message || 'Internal Server Error',
                error: err// In production do not show any error details
            });
        }
    }
};
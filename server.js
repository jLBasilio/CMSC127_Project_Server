'use strict'

const router	    = require(__dirname + '/router/router');
const express       = require('express');
const body_parser   = require('body-parser');
const winston       = require('winston');
const helmet        = require('helmet');

let start;
let handler;
let app;

start = () => {

    if (handler) {
        handler.close();
    }

    // create an express app
    app = express();

    winston.cli();
    winston.level = 'info' || 'silly';

    winston.log('info', 'Starting', "Bill System Server");
    // setting the environment for express
    app.set('case sensitive routing', true);
    app.set('x-powered-by', false);
    // incorporating the session to the app for usage

    // other packages that is needed to make the app secured and stable
    winston.log('verbose', 'Binding 3rd-party middlewares');
    app.use(require('method-override')());
    app.use(body_parser.urlencoded({extended: true}));
    app.use(body_parser.json());
    app.use(require('compression')());
    app.use(require('cors')());
    app.use(router(express.Router()));
    app.use(helmet);

    // this will start app
    winston.log('info', 'Bill System Server listening on port', 3001);
    return app.listen(3001, "127.0.0.1");

}

handler = start();

module.exports = {
    app,
    start,
    handler
}
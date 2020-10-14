"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setEnvironment = setEnvironment;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setEnvironment(app) {
    console.log("111111111");
    console.log("kkkkkkkkkk");
    console.log(process.env.NODE_ENV);
    if (!process.env.NODE_ENV || process.env.NODE_ENV.toString().trim() !== 'production') {
        setDevEnv(app);
    } else {
        setProdEnv(app);
    }
}

function setDevEnv(app) {
    console.log("Setting the development environment");
    process.env.NODE_ENV = "development";
    process.env.DB_URL = 'mongodb+srv://amit:amit@cluster0.nhmu0.mongodb.net/medi?retryWrites=true&w=majority';
    process.env.TOKEN_SECRET = 'ramu';
    app.use(_bodyParser2.default.json());
    app.use((0, _morgan2.default)('dev'));
    app.use((0, _cors2.default)());
    console.log("Setting the devlopment environment");
}

function setProdEnv(app) {
    process.env.DB_URL = 'mongodb+srv://amit:amit@cluster0.nhmu0.mongodb.net/medi?retryWrites=true&w=majority';
    process.env.NODE_ENV = "production"; //checking purpose only
    process.env.TOKEN_SECRET = 'ramu';
    app.use(_bodyParser2.default.json());
    app.use(_express2.default.static(__dirname + '/../../dist'));
    console.log("Setting the production environment");
}
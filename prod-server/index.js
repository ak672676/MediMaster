"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _routes = require("./routes");

var _env = require("./config/env");

var _db = require("./config/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();


console.log("Node Server Started");
(0, _env.setEnvironment)(app);
(0, _db.connectToDB)();
(0, _routes.registerRoutes)(app);

app.get('/', function (req, res) {
  // if(process.env.NODE_ENV!=='production'){
  if (!process.env.NODE_ENV || process.env.NODE_ENV.toString().trim() !== 'production') {
    console.log("kkkkkkkkkk");
    console.log(process.env.NODE_ENV);
    return res.send('Running Server in development mode');
  } else {
    return res.sendFile('index.html', { root: __dirname + "/../dist/" });
  }
});

console.log("Testing the changes");

console.log(process.env.PORT);
var port = process.env.PORT || 8080;
console.log("Testing the changes");

app.listen(port, function () {
  console.log("Example app listening at http://localhost:" + port + " " + process.env.NODE_ENV + " mode");
});
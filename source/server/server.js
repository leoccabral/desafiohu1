var http = require('http');
var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var error = require('./error');
var load = require('express-load');

var MAX_AGE = {maxAge: 3600000};
var GZIP_LVL = {level: 9, memLevel: 9};

var app = express();
var server = http.createServer(app);

global.db = mongoose.connect('mongodb://localhost/desafiohu');

app.use(express.static(path.resolve(__dirname, 'client'), MAX_AGE));
app.use(express.json());
app.use(app.router);
app.use(express.compress(GZIP_LVL));
app.use(error.notFound);

load('script')
    .then('models')
    .then('controllers')
    .then('routes')
    .into(app);


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log("server listening at", addr.address + ":" + addr.port);
});

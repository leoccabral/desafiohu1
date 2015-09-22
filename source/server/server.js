var http = require('http');
var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var error = require('./error');
var load = require('express-load');


var app = express();
var server = http.createServer(app);

global.db = mongoose.connect('mongodb://localhost/desafiohu');

app.use(express.static(path.resolve(__dirname, 'client')));
app.use(express.json());
app.use(app.router);

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

var http = require('http');
var path = require('path');
var express = require('express');
var mongoose = require('mongoose');

//------------------------------------
var load = require('express-load');
//  error = require('./error'),

var app = express();
var server = http.createServer(app);

global.db = mongoose.connect('mongodb://localhost/desafiohu');

app.use(express.static(path.resolve(__dirname, 'client')));

//app.set('views', __dirname + '/views');
app.use(express.json());
 //app.use(express.urlencoded());
 //app.use(express.methodOverride());
 app.use(app.router);
 
//app.use(error.notFound);
//app.use(error.serverError);

load('models')
  .then('controllers')
  .then('routes')
  .into(app);


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("server listening at", addr.address + ":" + addr.port);
});



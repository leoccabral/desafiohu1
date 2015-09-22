var mongoose = require('mongoose');
var single_connection;
var env_url = {
    "test": "mongodb://localhost/desafiohu_test",
    "development": "mongodb://localhost/desafiohu"
};

module.exports = function() {

    var env = process.env.NODE_ENV || "development";
    var url = env_url[env];
    if (!single_connection) {
        single_connection = mongoose.connect(url);
    }
    return single_connection;
};
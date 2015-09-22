module.exports = function(app) {
    var Schema = require('mongoose').Schema;
    var script =  app.script.hotel;
    
    var hotelSchema = Schema({
        cod: {
            type: Number,
            required: true,
            index: {
                unique: true
            }
        },
        localidade: {
            type: String,
            required: true
        },
        nome: {
            type: String,
            required: true
        },
        disponivel: {
            type: String
        }
    });
    var DB = global.db.model('hoteis', hotelSchema);
    script.init(DB);
    return DB;
};

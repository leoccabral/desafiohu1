module.exports = function(app) {
    var Schema = require('mongoose').Schema;
    var script =  app.script.disp;

    var disponibilidadeSchema = Schema({
        data: {
            type: Date,
            required: true
        },
        disponivel: {
            type: Number,
            required: true
        },
        cod: {
            type: Number,
            required: true
        }
    });

    var DB = global.db.model('disponibilidades', disponibilidadeSchema);
    script.init(DB);
    return DB;
};

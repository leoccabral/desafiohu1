module.exports = function(app) {
    var HotelDB = app.models.hotel;

    var HotelController = {
        list: function(req, res, next) {
            HotelDB.find({}, 'cod nome localidade', function(erro, hoteis) {
                if (!erro) {
                    res.json(hoteis);
                }
                else {
                    next(erro);
                }
            });
        },
        buscar: function(req, res, next) {
            var entityBusca = req.body;
            //valor
            //nodata
            //saida
            //entrada
            HotelDB.find({}, function(erro, hoteis) {
                if (!erro) {
                    res.json(hoteis);
                }
                else {
                    next(erro);
                }
            });

        }
    };
    return HotelController;
};
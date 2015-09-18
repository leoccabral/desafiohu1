module.exports = function(app) {
    var HotelDB = app.models.hotel;

    var HotelController = {
        list: function(req, res, next) {
            HotelDB.find({}, function(erro, hoteis) {
                if (!erro) {
                    res.json(hoteis);
                }
                else {
                    next(erro);
                }
            });
        },
        buscar: function(req, res, next) {
            console.log(req.body);
            res.json([{
                nome: "teste1",
                localidade: "Felgueiras, Norte Region, Portugal"
            }, {
                nome: "teste2",
                localidade: "Felgueiras, Norte Region, Portugal"
            }, {
                nome: "teste3",
                localidade: "Felgueiras, Norte Region, Portugal"
            }, {
                nome: "teste4",
                localidade: "Felgueiras, Norte Region, Portugal"
            }, {
                nome: "teste5",
                localidade: "Felgueiras, Norte Region, Portugal"
            }, {
                nome: "teste6",
                localidade: "Felgueiras, Norte Region, Portugal"
            }, {
                nome: "teste7",
                localidade: "Felgueiras, Norte Region, Portugal"
            }, {
                nome: "teste8",
                localidade: "Felgueiras, Norte Region, Portugal"
            }]);

        }
    };
    return HotelController;
};
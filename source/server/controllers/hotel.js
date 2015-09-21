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
        //TROCAR POR UM MOTOR DE BUSCA
        buscar: function(req, res, next) {
            //console.log(req.body);
            var entityBusca = req.body;

            var arrT = entityBusca.valor.split(",");

            var vlLocalidade = arrT[0].trim();
            var vlNome = arrT[0].trim();
            if (arrT.length > 1)
                vlNome = arrT[1].trim();


            function executarQuery(query, callback) {
                HotelDB.find(query, 'cod nome localidade', function(erro, hoteis) {
                    if (!erro) {
                        callback(hoteis);

                    }
                    else {
                        next(erro);
                    }
                });
            }


            function buscarExata() {
                var query = {
                    "localidade": vlLocalidade,
                    "nome": vlNome
                };

                var callback = function(hoteis) {
                    if (hoteis.length === 0)
                        buscarParcial();
                    else
                        res.json(hoteis);
                };

                console.log("EXATA");

                executarQuery(query, callback);
            }

            function buscarParcial() {
                var query = {
                    "localidade": new RegExp(vlLocalidade, 'i'),
                    "nome": new RegExp(vlNome, 'i')
                };

                var callback = function(hoteis) {
                    if (hoteis.length === 0)
                        buscarParcialNome(hoteis);
                    else
                        res.json(hoteis);
                };

                executarQuery(query, callback);
            }
//
            function buscarParcialNome(result) {
                var query = {
                        "localidade": new RegExp('^((?!' + vlLocalidade + ').)*$', 'i'),
                        "nome": new RegExp(vlNome, 'i')
                };

                var callback = function(hoteis) {
                    buscarParcialLocalidade(result.concat(hoteis));
                };

                executarQuery(query, callback);
            }
            
             function buscarParcialLocalidade(result) {
                var query = {
                        "localidade": new RegExp(vlLocalidade, 'i'),
                        "nome": new RegExp('^((?!' + vlNome + ').)*$', 'i')
                };

                var callback = function(hoteis) {
                    console.log(result.concat(hoteis).length);
                    res.json(result.concat(hoteis));
                };

                executarQuery(query, callback);
            }

            if (arrT.length == 2) {
                buscarExata();
            }
            else {
                buscarParcial();
            }
        }
    };
    return HotelController;
};

/*
db.hoteis.find({ localidade: 'Duque De Caxias', nome: 'Aragipe Praia Hotel',  
     "datasDisponibilidade.data": {
        $gte: ISODate("2015-05-02T00:00:00Z"),
        $lte: ISODate("2015-05-03T00:00:00Z")
    }},{
     "datasDisponibilidade.disponivel": 1
     }]
} ).pretty()
*/
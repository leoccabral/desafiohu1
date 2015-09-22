module.exports = function(app) {
    var HotelDB = app.models.hotel;
    var DispDB = app.models.disp;

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
            var entityBusca = req.body;

            var arrT = entityBusca.valor.split(",");

            var vlLocalidade = arrT[0].trim();
            var vlNome = arrT[0].trim();
            if (arrT.length > 1)
                vlNome = arrT[1].trim();

            function resHoteis(hoteis) {
                if (entityBusca.nodata == "N") {
                    var size = hoteis.length;
                    var i = 0;
                    var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
                    hoteis.forEach(function(hotel) {
                        var dtEntrada = new Date(entityBusca.entrada.replace(pattern,'$3-$2-$1'));
                        var dtSaida = new Date(entityBusca.saida.replace(pattern,'$3-$2-$1'));
                        dtSaida.setDate(dtSaida.getDate()-1);
                        DispDB.find({
                            cod: hotel.cod,
                            data: {
                                $gte: dtEntrada,
                                $lte: dtSaida
                            },
                            disponivel: 1
                        }, function(erro, disp) {
                            i += 1;
                            
                            var timeDiff = Math.abs(dtSaida.getTime() - dtEntrada.getTime());
                            var diffDays = (timeDiff / (1000 * 3600 * 24)) + 1; 
                            hotel.disponivel = disp.length === diffDays? 'S': 'N';
                            if (size == i) {
                                res.json(hoteis);
                            }
                        });
                    });
                }
                else {
                    res.json(hoteis);
                }
            }

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
                        resHoteis(hoteis);
                };

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
                        resHoteis(hoteis);
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
                    resHoteis(result.concat(hoteis));
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

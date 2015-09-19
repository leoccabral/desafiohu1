window.angular.module('desafiohu')
    .controller('BuscaController', ['$scope', '$http', '$validator', '$location',
        function($scope, $http, $validator, $location) {
            $scope.entityBusca = {
                nodata: "N"
            };
            $scope.listaHoteis = null;

            $scope.selectNodata = function() {
                $scope.entityBusca.entrada = null;
                $scope.entityBusca.saida = null;
            };

            $scope.buscarHoteis = function() {

                $validator.validate($scope, 'entityBusca').success(function() {
                    $validator.reset($scope, 'entityBusca');

                    var requestBody = {
                        method: 'POST',
                        url: '/hotel/buscar',
                        data: $scope.entityBusca
                    };

                    var call = $http(requestBody)
                        .success(
                            function(data) {
                                $scope.listaHoteis = data;
                            }
                        );

                    $location.search("valor", $scope.entityBusca.valor);
                    $location.search("nodata", $scope.entityBusca.nodata);

                    if ($scope.entityBusca.nodata == "S") {
                        $location.search("entrada", null);
                        $location.search("saida", null);
                    }
                    else {
                        $location.search("entrada", $scope.entityBusca.entrada);
                        $location.search("saida", $scope.entityBusca.saida);
                    }
                });

            };

            $scope.appLoaded = true;

            var param = $location.search();

            if (window.angular.isObject(param)) {
                var isValid = true;
                if (!window.angular.isString(param.valor) || param.valor.length < 3) {
                    isValid = false;
                }

                if (!window.angular.isString(param.nodata) || param.nodata.length != 1) {
                    isValid = false;
                }
                else {
                    if (param.nodata == 'N') {
                        if (!window.angular.isString(param.entrada) || param.entrada.length != 10) {
                            isValid = false
                        }
                        else
                        if (!window.angular.isString(param.saida) || param.saida.length != 10) {
                            isValid = false
                        }
                    }
                }

                if (isValid) {
                    $scope.entityBusca = param;
                    $scope.buscarHoteis();
                }

            }

        }
    ]);

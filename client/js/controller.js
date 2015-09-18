angular.module('desafiohu')
    .controller('BuscaController', ['$scope', '$http', '$validator',
        function($scope, $http, $validator) {
            $scope.entityBusca = {};
            $scope.listaHoteis = null;

            $scope.selectNodata = function() {
                $scope.entityBusca.entrada = null;
                $scope.entityBusca.saida = null;
            };

            $scope.listarHoteis = function() {
                var requestBody = {
                    method: 'POST',
                    url: '/hotel/listar',
                    data: $scope.entityBusca
                };

                var call = $http(requestBody)
                    .success(
                        function(data) {
                            console.log(data);
                        }
                    );
            }

            var validarFormBusca = function() {
                return true;
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

                });

            };

            $scope.appLoaded = true;
        }
    ]);

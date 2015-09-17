angular.module('desafiohu', [])
    .controller('BuscaController', ['$scope',
        function($scope) {
            $scope.entityBusca = {};
            $scope.listaHoteis = null;

            $scope.selectNodata = function() {
                $scope.entityBusca.entrada = null;
                $scope.entityBusca.saida = null;
            };

            $scope.buscarHoteis = function() {
                $scope.listaHoteis = [{
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
                }];
            };

        }
    ]);

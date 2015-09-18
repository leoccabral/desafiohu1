angular.module('desafiohu')
    .directive('myDatepicker', [
        function() {
            return {
                scope: {
                    maxDate: "@",
                    minDate: "@"
                },
                restrict: 'A',
                link: function($scope, $element, $attrs) {
                    var minDateDefault = new Date(2015, 5 - 1, 1);
                    var maxDateDefault = new Date(2015, 5 - 1, 30);
                    $element.datepicker({
                        numberOfMonths: 1,
                        minDate: minDateDefault,
                        maxDate: maxDateDefault

                    });
                    $element.datepicker("option",
                        $.datepicker.regional["pt-BR"]
                    );

                    $attrs.$observe('minDate', function(value) {
                        var v = toDate(value);
                        $element.datepicker("option", "minDate", v != null ? v : minDateDefault);

                    });

                    $attrs.$observe('maxDate', function(value) {
                        var v = toDate(value);
                        $element.datepicker("option", "maxDate", v != null ? v : maxDateDefault);
                    });

                    var toDate = function(value) {
                        var v = null;
                        if (value && value != "") {
                            var arr = value.split('/');
                            v = new Date(Number(arr[2]), Number(arr[1]) - 1, Number(arr[0]));
                        }
                        return v;
                    }
                }
            };
        }
    ])
    .directive('myAutocomplete', ['$http',
        function($http) {
            return {
                scope: false,
                restrict: 'A',
                link: function($scope, $element, $attrs) {
                    //var listaHoteis = [];
                    var listaHoteis = [{
                        value: "jquery",
                        label: "jQuery",
                        desc: "the write less, do more, JavaScript library",
                        icon: "jquery_32x32.png"
                    }, {
                        value: "jquery-ui",
                        label: "jQuery UI",
                        desc: "the official user interface library for jQuery",
                        icon: "jqueryui_32x32.png"
                    }, {
                        value: "sizzlejs",
                        label: "Sizzle JS",
                        desc: "a pure-JavaScript CSS selector engine",
                        icon: "sizzlejs_32x32.png"
                    }];

                    var listarHoteis = function() {
                        var requestBody = {
                            method: 'POST',
                            url: '/hotel/listar'
                        };

                        var call = $http(requestBody)
                            .success(
                                function(data) {
                                    listaHoteis = data;
                                }
                            );
                    }

                    var itemRenderer = function(item) {
                        return item.localidade + ", " + item.nome;
                    }

                    $element.autocomplete({
                            source: function(request, response) {

                                if (request.term.length < 3) {
                                    response([]);
                                    return;
                                }

                                function hasMatch(s, term) {
                                    return s.toLowerCase().indexOf(term) !== -1;
                                }

                                var i, l, obj, matchesNome = [],
                                    matchesAll = [],
                                    matchesLocalidade = [];

                                var arrT = request.term.split(",");

                                var localidade = arrT[0].trim();
                                var nome = arrT[0].trim();
                                if (arrT.length > 1) {
                                    nome = arrT[1].trim();
                                }

                                for (i = 0, l = listaHoteis.length; i < l; i++) {
                                    obj = listaHoteis[i];
                                    var achouLocalidade = hasMatch(obj.localidade, localidade);
                                    var achouNome = hasMatch(obj.nome, nome);
                                    if (achouNome && achouLocalidade) {
                                        matchesAll.push(obj);
                                    }
                                    else
                                    if (achouLocalidade) {
                                        matchesLocalidade.push(obj);
                                    }
                                    else
                                    if (achouNome) {
                                        matchesNome.push(obj);
                                    }
                                }


                                matchesAll = matchesAll.concat(matchesNome);
                                matchesAll = matchesAll.concat(matchesLocalidade);


                                response(matchesAll);
                            },
                            focus: function(event, ui) {
                                $element.val(itemRenderer(ui.item));
                                return false;
                            },
                            select: function(event, ui) {
                                $element.val(itemRenderer(ui.item));
                                return false;
                            }
                        })
                        .autocomplete("instance")._renderItem = function(ul, item) {
                            
                                var arrT = this.element.val().split(",");

                                var maskLocalidade = arrT[0].trim();
                                var maskNome = arrT[0].trim();
                                if (arrT.length > 1) {
                                    maskNome = arrT[1].trim();
                                }

                                function renderer(searchMask, value){
                                    var regEx = new RegExp(searchMask, "ig");
                                    var replaceMask = "<b style=\"color:black;\">$&</b>";
                                    var html = value.replace(regEx, replaceMask);
                                    return html;
                                }

                            return $("<li class='busca-autocomplete'>")
                            .append($("<a></a>").html(renderer(maskLocalidade, item.localidade) + ", " + renderer(maskNome, item.nome)))
                                .appendTo(ul);
                        };;

                    listarHoteis();
                }
            };
        }
    ])

;

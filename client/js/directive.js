angular.module('desafiohu')
    .directive('myDatepicker', [
        function() {
            return {
                scope: false,
                restrict: 'A',
                link: function($scope, $element, $attrs) {
                    $element.datepicker($.datepicker.regional["pt-BR"]);
                }
            };
        }
    ])
    .directive('myAutocomplete', [
        function() {
            return {
                scope: false,
                restrict: 'A',
                link: function($scope, $element, $attrs) {
                    var projects = [{
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
                    $element.autocomplete({
                            minLength: 3,
                            source: projects,
                            focus: function(event, ui) {
                                $("input-busca-hotel").val(ui.item.label);
                                return false;
                            },
                            // select: function(event, ui) {
                            //     $("#project").val(ui.item.label);
                            //     $("#project-id").val(ui.item.value);
                            //     $("#project-description").html(ui.item.desc);
                            //     $("#project-icon").attr("src", "images/" + ui.item.icon);

                            //     return false;
                            // }
                        })
                        .autocomplete("instance")._renderItem = function(ul, item) {
                            return $("<li class='busca-autocomplete'>")
                                .append(item.label + ", " + item.desc)
                                .appendTo(ul);
                        };
                }
            };
        }
    ])

;

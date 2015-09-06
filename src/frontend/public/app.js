"use strict";

(function ($) {

    angular.module('library.client', [
    ])
        .factory("bookApi", function($http) {
            return {
                get : function (){
                    return $http.get("/api/books");
                }
            };
        })

        .controller("library.client.ctrl", function($scope, bookApi) {
            bookApi.get()
                .then(function (resp) {
                    $scope.books = resp.data;
                })
                .then(function () {
                    setTimeout(function () {
                        var $grid = $('.grid');
                        var options = {
                            columnWidth: '.grid-item',
                            isAnimated: true,
                            animationOptions: {
                                duration: 250,
                                easing: "swing"
                            },
                            isAnimatedFromBottom: true
                        };
                        $grid.imagesLoaded(function () {
                            $grid.masonry(options);
                        })
                    }, 0);
                })
            ;
        })

        .filter('limitContent', function () {
            return function (textToLimit, wordLimit) {
                if (textToLimit == null) return null;
                var finalText = "";
                var text2 = textToLimit.replace(/\s+/g, ' ');
                var text3 = text2.split(' ');
                var numberOfWords = text3.length;
                var i = 0;
                if (numberOfWords > wordLimit) {
                    for (i = 0; i < wordLimit; i++)
                        finalText = finalText + " " + text3[i] + " ";
                    return finalText + "...";
                }
                else return textToLimit;
            }
        })
    ;

})(jQuery);
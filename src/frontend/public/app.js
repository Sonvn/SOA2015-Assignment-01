"use strict";

(function ($) {

    angular.module('library.client', [
        'ui.bootstrap'
    ])
        .factory("BookApi", function ($http) {
            return {
                get: function () {
                    return $http.get("/api/books");
                }
            };
        })

        .factory("BookModalInfo", function ($modal) {
            return {
                open: function (book) {
                    return $modal.open({
                        templateUrl: "book-modal-info.html",
                        controller: "book-modal-info.ctrl",
                        resolve: {
                            book: function () {
                                return book;
                            }
                        }
                    });
                }
            };
        })

        .controller("book-modal-info.ctrl", function ($scope, $modalInstance, book) {
            $scope.book = book;

            $scope.close = function () {
                $modalInstance.dismiss();
            };
        })


        .controller("library.client.ctrl", function ($scope, BookApi, BookModalInfo) {
            BookApi.get()
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

            $scope.moreInfo = function (book) {
                BookModalInfo.open(book);
            }
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
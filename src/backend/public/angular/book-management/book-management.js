"use strict";

(function () {

    angular.module('library.management.book-management', [
    ])

        .config(function ($stateProvider) {

            $stateProvider
                .state('book-management', {
                    url: '/book-management',
                    templateUrl: "/angular/book-management/book-management.html",
                    controller: "book-management.ctrl"
                })
            ;
        })

        .factory("BookModal", function ($modal) {
            return {
                open: function (book, isEdit) {
                    return $modal.open({
                        templateUrl: "/angular/book-management/book-modal.html",
                        controller: "book-modal.ctrl",
                        resolve: {
                            book: function () {
                                return book;
                            }
                        }
                    });
                }
            };
        })

        .controller("book-modal.ctrl", function ($scope, $modalInstance, book) {
            $scope.book = book;

            $scope.close = function () {
                $modalInstance.dismiss();
            };
        })

        .controller("book-management.ctrl", function ($scope, User, $state, BookApi, BookModal) {
            if(!User.isLogged) {
                $state.go('login');
            }

            BookApi.get().then(function (resp) {
                $scope.books = resp.data;
            });

            $scope.addNewBook = function () {
                BookModal.open({});
            };

            $scope.deleteBook = function (book) {
                BookApi.delete(book._id).then(function (resp) {
                    console.log(resp.data);
                })
            };

            $scope.editBook = function (book) {
                BookModal.open(book);
            };
        })


    ;

})();
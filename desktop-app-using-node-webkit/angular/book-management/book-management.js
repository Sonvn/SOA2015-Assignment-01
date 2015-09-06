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
                open: function (book) {
                    return $modal.open({
                        templateUrl: "/angular/book-management/book-modal.html",
                        controller: "book-modal.ctrl",
                        resolve: {
                            book: function () {
                                return book;
                            }
                        }
                    }).result;
                }
            };
        })

        .controller("book-modal.ctrl", function ($scope, $modalInstance, book, BookApi) {
            $scope.book = book;

            $scope.$watch("book", function(value) {
                $scope.editing = _.cloneDeep(value);
            });

            $scope.isChanged = function () {
                return !angular.equals($scope.editing, $scope.book);
            };

            $scope.save = function () {
                var handleRespone = function (resp) {
                    if(resp.data.ok == 1) {
                        $scope.book = book = resp.data.book;
                        $modalInstance.close($scope.book);
                    }
                };
                if($scope.editing._id) {
                    BookApi.update($scope.editing).then(handleRespone);
                } else {
                    BookApi.insert($scope.editing).then(handleRespone);
                }
            };

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
                BookModal.open({}).then(function(book){
                    $scope.books.push(book);
                });
            };

            $scope.deleteBook = function (book) {
                BookApi.delete(book._id).then(function (resp) {
                    if(resp.data.ok == 1) {
                        _.remove($scope.books, function(item) {
                            return item._id == book._id;
                        });
                    }
                })
            };

            $scope.editBook = function (book) {
                BookModal.open(book).then(function(newBook){
                    if(newBook) angular.copy(newBook, book);
                });
            };
        })


    ;

})();
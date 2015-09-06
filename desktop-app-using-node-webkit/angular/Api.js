"use strict";

(function () {

    angular.module('library.management.api', [

    ])

        .provider("Api", function () {

            var serverUrl = "";

            this.$get = function ($http) {
                return {
                    get: function (url) {
                        return $http.get(serverUrl + url);
                    },
                    post: function (url, data) {
                        return $http.post(serverUrl + url, data);
                    },
                    put: function (url, data) {
                        return $http.put(serverUrl + url, data);
                    },
                    delete: function (url) {
                        return $http.delete(serverUrl + url);
                    }
                };
            };

        })

        .factory("BookApi", function (Api) {
            return {
                get: function () {
                    return Api.get("/api/books");
                },
                update: function (book) {
                    var book_id = book._id;
                    delete book._id;
                    return Api.put("/api/book/update/" + book_id, book);
                },
                insert: function (book) {
                    return Api.post("/api/book/insert", book);
                },
                delete: function (book_id) {
                    return Api.delete("/api/book/delete/" + book_id);
                }
            };
        })

        .factory("UserApi", function (Api) {
            return {
                authorize: function (user) {
                    return Api.post("/api/admin/authorize", user);
                }
            };
        })
    ;

})();
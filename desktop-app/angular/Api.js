"use strict";

(function () {

    angular.module('library.management.api', [

    ])

        .provider("Api", function () {

            var serverUrl = "http://128.199.158.16:5000";

            this.$get = function ($http) {
                return {
                    getServerUrl: function () {
                        return serverUrl;
                    },
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
                    return Api.put("/api/book/update/" + book._id, book);
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
"use strict";

(function ($) {

    angular.module('library.management', [
        'ui.bootstrap',
        'ui.router',

        'library.management.api',
        'library.management.login',
        'library.management.book-management'
    ])


    ;

})(jQuery);
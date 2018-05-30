'use strict';
app.factory('dataService', ['$http', function ($http) {
    return {
        getLitreUsagePerId: function (id) {
            return $http
                .get('https://watermeterreader.eu-gb.mybluemix.net/data/fetch?id=' + id)
                .then(function (response) { return response; });
        }
    };
}]);
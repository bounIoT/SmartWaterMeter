'use strict';
app.controller('mainViewController', ['$scope', 'dataService', '$state', function ($scope, dataService, $state) {
    $scope.litreUsageRaw = [];
    $scope.totalConsumption = null;
    $scope.selectedSensorId = null;
    $scope.datesGrouped = [];
    $scope.getUsagePerGivenId = function (id) {
    	$scope.datesGrouped = [];
    	dataService
    		.getLitreUsagePerId(id)
    		.then(
    			function (results) {
    				$scope.litreUsageRaw = results.data.map(function (x){
    					x.createdAt = new Date(x.createdAt);
    					return x;
    				});
    				$scope.totalConsumption = $scope.litreUsageRaw.length / 10;
    				alert("Successfully fetched data for given id: " + id);
    			}, function (error) {

    				alert("Error fetching data for given id: " + id);
    			}
    		);
    }

    function getDateKey(date) {
    	var d = date.getDate();
    	var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    	return m[date.getMonth()] + ' ' + ((d < 10 ? '0' : '') + d);
    }

    $scope.$watch('litreUsageRaw', function (){
    	var dates = $scope.litreUsageRaw.map(function (x){
    		return x.createdAt;
    	});
        
    	$scope.datesGrouped = dates.reduce(function(acc, d){
    		var p = getDateKey(d);
    		if (!acc[0].hasOwnProperty(p)) acc[0][p] = [];
    		acc[0][p].push(d);
    		return acc;
    	}, [{}]).reduce(function(acc, v){
    		Object.keys(v).forEach(function (k){
    			var formattedTimes = v[k].map(function (x) {
    				return x.toString();
    			})
    			acc.push({day: k, times: formattedTimes})
    		});

    		return acc;

    	}, []);
    });
}]);

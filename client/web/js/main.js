'use strict';

angular.module('App', ['ui.compat'])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
        // enable html5 mode to get rid of the hash in the url
        $locationProvider.html5Mode(true);
        // all unmatched urls should be sent to /home
        $urlRouterProvider.otherwise("/home");
        // set up states
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'static/partials/home.html',
                controller: 'HomeCtrl'
            });
    }]);
angular.module('App').controller('AppCtrl', ['$scope', function($scope) {

}]);
angular.module("App").controller("HomeCtrl", ["$scope", "$http", function($scope, $http) {

    $scope.githubHandle = "Crisu83";
    $scope.twitterHandle = "Crisu83";
    $scope.bitbucketHandle = "Crisu83";
    $scope.linkedinHandle = "crisu83";
    $scope.gplusHandle = "ChristofferNiska";
    $scope.loading = true;

    /*
    $http.defaults.headers.common = {
        "Access-Control-Allow-Origin": "*"
    };

    $http({
        method: "GET",
        url: "https://coderwall.com/" + $scope.codewall + ".json"
    })
    .success(function(data, status, headers, config) {
        console.debug(data);
    })
    .error(function(data, status, headers, config) {

    });
    */

    var numRepos = 16;

    $http({
        method: "GET",
        url: "api/repos"
    })
    .success(function(data, status, headers, config) {
        var repos = data.slice(0, numRepos);

        for (var i = 0, l = repos.length; i < l; i++) {
            repos[i].tags = [];
            if (repos[i].language) {
                repos[i].tags.push(repos[i].language);
            }
        }

        repos.sort(function(a, b) {
            return b.watchers_count - a.watchers_count;
        });

        $scope.repos = repos;
        $scope.loading = false;
    })
    .error(function(data, status, headers, config) {

    });

    $('body').tooltip({
        selector: "[data-toggle=tooltip]"
    })

}]);

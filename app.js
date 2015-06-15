var app = angular.module('app', ['ngRoute', 'firebase']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainCtrl'
        })
        .when('/new', {
            templateUrl: 'views/new.html',
            controller: 'NewJobCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.factory('mainJobs', function ($firebaseArray) {
    var ref = new Firebase('https://opus-dev.firebaseio.com/jobs');
    return $firebaseArray(ref);
});

app.controller('MainCtrl', ['$scope', 'mainJobs', function ($scope, mainJobs) {
    $scope.jobs = mainJobs;
}]);

app.controller('NewJobCtrl', ['$scope', 'mainJobs', function ($scope, mainJobs) {
    $scope.jobs = mainJobs;
    $scope.addJob = function (job) {
        $scope.jobs.$add({
            user: job.user,
            name: job.name,
            desc: job.desc,
            price: job.price
        });
        job.user = "";
        job.name = "";
        job.desc = "";
        job.price = "";
        window.location = "/";
    }
}]);
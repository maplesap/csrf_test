var app = angular.module('app', ['ngCookies', 'ngRoute', 'ui.router']);

// Routing Setup
function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider.state('register', {
        url: '/register',
        controller: 'RegisterCtrl',
        templateUrl: 'views/register.html',
    });
}

app.config(routeConfig);

app.run(['$http', '$cookies', function($http, $cookies) {
    $http.defaults.headers.post['X-XSRF-TOKEN'] = $cookies.csrftoken;
}]);

// controller
app.controller('RegisterCtrl', ['$scope', '$cookies', '$http',
    function($scope, $cookies, $http) {
        $scope.data = { email: "", password: "", _csrf: $cookies._csrf};

        $scope.submitForm = function() {
            // This will alert 'undefined'
            alert("This is csrf token: " + $scope.data._csrf);

            $http.post('/register', $scope.data).success(function(done) {
               console.log('success');
               var jwt_token = done["jwt_token"];
               // save token to local storage.
            }).error(function(err) {
               console.log('error');
            });
        }
    }
]);

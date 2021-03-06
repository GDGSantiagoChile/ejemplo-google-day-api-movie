/**
 * @ngdoc controller
 * @name app.controller:blogCtrl
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */


angular.module('app')
    .controller('searchCtrl', function ($scope, localStorageService, $mdToast, $mdDialog, $rootScope, $location, movieService, $timeout) {
        $rootScope.icon = 'favorite';
        $scope.ir = function () {
            $location.path('/new');
        };
        $scope.movies = localStorageService.get('movies');
        $scope.favorites = localStorageService.get('favorites');
        if ($scope.favorites == null) {
            $scope.favorites = [];
        }

        $scope.buscar = '';
        $scope.$watch('buscar',function(){
            if ($scope.buscar!='')
                $scope.search();
        },true);
        $scope.search = function () {
            $scope.load = true;
            movieService.getMovies({query: $scope.buscar,type:'search',id:'movie'}).$promise.then(function (data) {
                $scope.movies = data.results
                for (var i = 0; i < $scope.movies.length; i++) {
                    $scope.movies[i].icon = 'favorite'
                }
                $scope.load = false;
                localStorageService.set('movies', $scope.movies);
            })
        }


        $scope.addFavorite = function (item, index) {
            $rootScope.icon = 'exposure_plus_1';
            $scope.movies[index].icon = 'check';
            $scope.favorites.push(item);
            localStorageService.set('favorites', $scope.favorites);
            $timeout(function () {
                $rootScope.icon = 'favorite';
            }, 1000)
        }

        $scope.clear = function () {
            $scope.movies = [];
            localStorageService.set('movies', $scope.movies);
        }


    });

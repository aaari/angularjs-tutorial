'use strict';

angular.module('rssApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, $filter) {
    $scope.refreshInterval = 6000;
    $scope.stories = [];

    $scope.feeds = [{
      url: 'http://dailyjs.com/atom.xml',
      items: []
    },{
      url: 'http://japanese.engadget.com/rss.xml',
      items: []
    }
    ];

    function storyInCollection(story) {
      for (var i = 0; i < $scope.stories.length; i ++) {
        if ($scope.stories[i].id === story.id) {
          return true;
        }
      }
      return false;
    }

    function addStories(storylist) {
      var changed = false;
      angular.forEach(storylist, function(story, key) {
        if (!storyInCollection(story)) {
          $scope.stories.push(story);
          changed = true;
        }
      });

      if (changed) {
        $scope.stories = $filter('orderBy')($scope.stories, 'date');
      }
    }

    $scope.fetchFeed = function(feed) {
      feed.items = [];

      var apiUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'";
      apiUrl += encodeURIComponent(feed.url);
      apiUrl += "'%20and%20itemPath%3D'feed.entry'&format=json&diagnostics=true&callback=JSON_CALLBACK";

      $http.jsonp(apiUrl).
        success(function(data, status, headers, config) {
          if (data.query.results) {
            feed.items = data.query.results.entry;
          }
          addStories(feed.items);
        }).
        error(function(data, status, headers, config) {
          console.error('error fetching feed:', data);
        });

      $timeout(function() { $scope.fetchFeed(feed); }, $scope.refreshInterval * 1000 );
    };

    $scope.addFeed = function(feed) {
      if (feed.$valid) {
        //$scope.feeds.push(feed);
        //$scope.fetchFeed(feed);
        var newfeed = angular.copy(feed);
        $scope.feeds.push(newfeed);
        $scope.fetchFeed(newfeed);
        $scope.newFeed.url = '';

        feed = '';
      }
    };

    $scope.deleteFeed = function(feed) {
      $scope.feeds.splice($scope.feeds.indexOf(feed), 1);
    };

    angular.forEach($scope.feeds, function(feed) {
      $scope.fetchFeed(feed);
    });
  });

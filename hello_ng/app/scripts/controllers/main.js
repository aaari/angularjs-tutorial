'use strict';

angular.module('helloNgApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })
  .controller('HelloCtrl', function($scope) {
    $scope.name = 'World!';
  })
  .controller('FormCtrl', function($scope) {
    var master = {
      name: '幕張 太郎',
      address: {line1: '美浜区中瀬1-6', city: '千葉市', state:'千葉県', zip:'261-0023'},
      contacts:[{type:'phone', value:'123 456 789'}, {type: 'phone', value:'1234567'}]
    };
    $scope.zip =/^\d\d\d-\d\d\d\d$/;
    $scope.cancel = function() {
      $scope.form = angular.copy(master);
    };
    $scope.save = function() {
      master = $scope.form;
      $scope.cancel();
    };
    $scope.addContact = function() {
      $scope.form.contacts.push({type:'', value:''});
    };
    $scope.removeContact = function(contact) {
      var contacts = $scope.form.contacts;
      for (var i = 0, ii = contacts.length; i < ii; i ++) {
        if (contact === contacts[i]) {
          contacts.splice(i, 1);
        }
      }
    };
    $scope.isCancelDisabled = function() {
      return angular.equals(master, $scope.form);
    };
    $scope.isSaveDisabled = function() {
      return $scope.myForm.$invalid || angular.equals(master, $scope.form);
    };

    $scope.cancel();
  })
//  .controller('MVCCtrl', function($scope, $location) {
    .controller('MVCCtrl', function($scope) {
    // yo を使う場合、$location.search関連が上手く行かない模様のため、$scope.state で代替
    $scope.cellStyle = {
      'height': '20px',
      'width': '20px',
      'border': '1px solid lightgray',
      'text-align': 'center',
      'vertical-align': 'middle',
      'cursor': 'pointer'
    };

    function readUrl(value) {
      console.log('2. readUrl: ' + value);
      if (value) {
        value = value.split('/');
        $scope.nextMove = value[1];
        angular.forEach(value[0].split(';'), function(row, col) {
          $scope.board[col] = row.split(',');
          console.log($scope.board[col]);
        });

        grade();
      }
    }

    $scope.reset = function() {
      $scope.board = [['', '', ''], ['', '', ''], ['', '', '']];
      $scope.nextMove = 'x';
      $scope.winner = '';
      $scope.state = '';
      setUrl();
    };

    $scope.dropPiece = function(row, col) {
      console.log('dropPiece');
      if (!$scope.winner && !$scope.board[row][col]) {
        $scope.board[row][col] = $scope.nextMove;
        $scope.nextMove = $scope.nextMove === 'x' ? 'o' : 'x';
        console.log('if check row:' + row + ' col:' + col + 'next: ' + $scope.nextMove);
        setUrl();
      }
    };

    $scope.reset();

//    $scope.$watch(function() {
//      console.log("$watch");
//      return $location.search().board;
//    }, readUrl);
    $scope.$watch('state', readUrl);

    function setUrl() {
      var rows = [];
      angular.forEach($scope.board, function(row) {
        rows.push(row.join(','));
      });
      console.log('1. seturl: '+rows.join(';')+ '/' + $scope.nextMove);
      // $location.search({board: rows.join(';') + '/' + $scope.nextMove});
      $scope.state = rows.join(';') + '/' + $scope.nextMove;
    }

    function grade() {
      var b = $scope.board;
      function same(a, b, c) { return (a === b && b === c) ? a : ''; }
      function row(_row) {return same(b[_row][0], b[_row][1], b[_row][2]);}
      function col(_col) {return same(b[0][_col], b[1][_col], b[2][_col]);}
      function diagonal(i) {return same(b[0][1-i], b[1][1], b[2][1+i]);}
      $scope.winner =
        row(0) || row(1) || row(2) ||
        col(0) || col(1) || col(2) ||
        diagonal(-1) || diagonal(1);
    }
  });


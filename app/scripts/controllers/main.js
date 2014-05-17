'use strict';

angular.module('phoneApp')
  .controller('MainCtrl', function ($scope) {
  	var alphaHash = {
			1: ['1'],
			2: ['a','b','c'],
			3: ['d','e','f'],
			4: ['g','h','i'],
			5: ['j','k','l'],
			6: ['m','n','o'],
			7: ['p','q','r','s'],
			8: ['t','u','v'],
			9: ['w','x','y','z'],
			0: ['0']
		};

		var wordLib = {
			3: ['fat', 'cow'],
			4: ['fuck', 'cows']
		};

		var getCombos = function(arr, n) {
			var ret = [];
	    if (n === 1) {
	        for(var i = 0; i < arr.length; i++) {
	            for(var j = 0; j < arr[i].length; j++) {
	                ret.push([arr[i][j]]);
	            }
	        }
	    } else {
	        for(var i = 0; i < arr.length; i++) {
	        	// console.log(arr[i]);
	            var elem = arr.shift();
	            // console.log(elem);

	            for(var j = 0; j < elem.length; j++) {
	                var childperm = getCombos(arr.slice(), n-1);

	                for(var k = 0; k < childperm.length; k++) {
	                    ret.push([elem[j]].concat(childperm[k]));
	                }
	            }
	        }
	    }

	    return ret.map(function(el) {
				el.reduce(function(prev, curr) {
					return prev.toString()+curr.toString();
				}, '');
			});
		};

		var findThreeWord = function(num) {
			var numLetters = [];

			num.forEach(function(el) {
				numLetters.push(alphaHash[el]);
			});

			var combos = getCombos(numLetters, numLetters.length);

			var validWords;

			validWords = combos.filter(function(el) {
				if ( wordLib[num.length].indexOf(el) > -1 ) {
					return el;
				}
			});
		};

		// var findFourWord = function(num) {

		// };

    $scope.number = '555-555-5555';
    $scope.convertNumber = function () {
    	var number = $scope.number.replace(/[()-.]/g, "").replace(/\s/g,"");

    	$scope.convertedNumber = findThreeWord(number.slice(0,3)) + findThreeWord(number.slice(3,6)) + findThreeWord(number.slice(6));
    	// $scope.convertedNumber = number; --- SET FINAL RESULT TO convertedNumber
    };
  });

'use strict';

angular.module('phoneApp')
  .controller('MainCtrl', function ($scope, Words) {

  	var wordLib = Words.getWords();

  	var alphaHash = {
			1: ['l','i'],
			2: ['a','b','c'],
			3: ['d','e','f'],
			4: ['g','h','i'],
			5: ['j','k','l'],
			6: ['m','n','o'],
			7: ['p','q','r','s'],
			8: ['t','u','v'],
			9: ['w','x','y','z'],
			0: ['o']
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
	            var elem = arr.shift();

	            for(var j = 0; j < elem.length; j++) {
	                var childperm = getCombos(arr.slice(), n-1);

	                for(var k = 0; k < childperm.length; k++) {
	                    ret.push([elem[j]].concat(childperm[k]));
	                }
	            }
	        }
	    }

	    return ret.map(function(el) {
				return el.reduce(function(prev, curr) {
					return prev+curr;
				}, '');
			});
		};

		var findWord = function(num) {
			var numLetters = [];
			var zeroOrOneIdx = [];

			num.split('').forEach(function(el, idx) {
				if ( el === '0' || el === '1' ) {
					var obj = {
						letter: el,
						index: idx
					};

					zeroOrOneIdx.push(obj);

					numLetters.push(alphaHash[el]);
				} else {
					numLetters.push(alphaHash[el]);
				}
			});

			var combos = getCombos(numLetters, numLetters.length);

			var validWords;

			validWords = combos.filter(function(el) {
				if ( wordLib[num.length].indexOf(el) > -1 ) {
					return el;
				}
			});
			console.log(validWords);
			var word = validWords[Math.floor(Math.random() * validWords.length)];

			if ( typeof word === 'undefined' ) {
				return;
			} else {
				word = word.split('');
			}

			// console.log(word);

			zeroOrOneIdx.forEach(function(el) {
				console.log(el);
				word[el.index] = el.letter;
			});

			// console.log(word);

			return word.join('').toUpperCase();
		};

    $scope.number = '138-277-2287';
    $scope.convertNumber = function () {
    	var number = $scope.number.replace(/[()-.]/g, '').replace(/\s/g, '');

    	var numberSplits = [[0,3,6], [0,5], [0,6], [0,4]];

    	var numberWords = '';

    	for ( var i = 0; i < numberSplits.length; i++ ) {
    		var splits = numberSplits[i];
    		var count = 0;
    		for ( var j = 1; j < splits.length; j++ ) {
    			var word = findWord(number.slice(splits[j - 1], splits[j]));
    			if ( typeof word === 'undefined' ) {
    				break;
    			} else {
    				numberWords += word + ' ';
    				count++;
    			}
    		}

    		if ( count === splits.length ) {
    			break;
    		}
    	}

    	$scope.convertedNumber = numberWords;

    	// $scope.convertedNumber = findWord(number.slice(0,3)) + ' ' + findWord(number.slice(3,6)) + ' ' + findWord(number.slice(6));
    	// $scope.convertedNumber = number; --- SET FINAL RESULT TO convertedNumber
    };
  });

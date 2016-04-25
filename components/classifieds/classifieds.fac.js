(function() {

	"use strict";

	angular
		.module("ngClassifieds")
		.factory("classifiedsFactory",function($http) {

			// returns an HTTP GET request to our data
			function getClassifieds() {
				return $http.get('data/classifieds.json');
			}

			return {
				getClassifieds: getClassifieds
			}
		});
})();
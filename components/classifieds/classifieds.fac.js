(function() {

	"use strict";

	angular
		.module("ngClassifieds")
		.factory("classifiedsFactory", function($http, $firebaseArray) {

			// connection to firebase
			var ref = new Firebase("https://sergng.firebaseio.com");

			return {
				ref: $firebaseArray(ref)
			}
		});
})();
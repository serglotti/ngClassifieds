(function() {

	"use strict";

	angular
	.module("ngClassifieds")
	.controller("classifiedsCtrl", function($scope) {

		$scope.classified = {
			title: "Intense Mas Band",
			price: "$500",
			description: "Hosted by DJ Rusty G, Team Soca and Vibe 103"
		};

		$scope.message = "Hello, World!!!!!";

	});

})();
(function() {

	"use strict";

	angular
	.module("ngClassifieds")
	.controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast) {

		classifiedsFactory.getClassifieds().then(function(classifieds) {
			$scope.classifieds = classifieds.data;
		});

		var contact = "Sergio L";

		$scope.openSidebar = function() {
			$mdSidenav('left').open();
		};

		$scope.closeSidebar = function() {
			$mdSidenav('left').close();
		};

		$scope.saveClassified = function(classified) {
			if (classified) {
				classified.contact = contact;
				$scope.classifieds.push(classified); // makes sure there is at least one property on the classified object being created before it can be saved
				$scope.classified = {}; // clears form once new object has been saved/added
				$scope.closeSidebar(); // closes sidebar once new classified object has been created
				showToast("Classified saved!");
			}
			
		};

		$scope.editClassified = function(classified) {
			$scope.editing = true;
			$scope.openSidebar();
			$scope.classified = classified;
		};

		$scope.saveEdit = function() {
			$scope.editing = false;
			$scope.classified = {};
			$scope.closeSidebar();
			showToast("Edit saved!");
		};

		function showToast(message) {
			$mdToast.show(
				$mdToast.simple()
				.content(message)
				.position('top, right')
				.hideDelay(3000)
			);
		};
	});

})();
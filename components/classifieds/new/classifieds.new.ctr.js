(function() {

	// THIS CONTROLLER HANDLES ADDING NEW CLASSIFIEDS
	"use strict";

	angular
		.module('ngClassifieds')
		.controller('newClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {

			var vm = this;
			vm.closeSidebar = closeSidebar;
			vm.saveClassified = saveClassified;

			$timeout(function() {
				$mdSidenav('left').open();
			});

			$scope.$watch('vm.sidenavOpen', function(sidenav) {
				if(sidenav === false) {
					$mdSidenav('left')
						.close()
						.then(function() {
							$state.go('classifieds');
						});
				}
			});

			function closeSidebar() {
				vm.sidenavOpen = false;
			}

			function saveClassified(classified) {
				if(classified) {
					// establishes default contact for use with any newly created classifieds ad
					classified.contact = "Sergio L"

					// we use $emit to send the new classified object to the parent controller (classifieds.ctr.js $on)
					$scope.$emit('newClassified', classified);
					vm.sidenavOpen = false;
				}
			}

		});

})();
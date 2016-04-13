(function() {

	"use strict";

	angular
	.module("ngClassifieds")
	//add dependency injections in function parameters below e.g. $scope, $mdSidenav, etc.
	.controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) { 

		// uses factory file (classifieds.fac.js) to perform $http get request on classifieds.json
		classifiedsFactory.getClassifieds().then(function(classifieds) {
			$scope.classifieds = classifieds.data;
			// calls getCategories() function to get unique values of categories from classifieds that exist in classifieds json
			$scope.categories = getCategories($scope.classifieds);
		});

		// establishes default contact for use with any newly created classifieds ad
		var contact = "Sergio L";

		

		// behaviour settings for opening sidenav bar
		$scope.openSidebar = function() {
			$mdSidenav('left').open(); // opens sidenav bar with md-component-id equal to 'left'
		};

		// behaviour settings for closing sidenav bar
		$scope.closeSidebar = function() {
			$mdSidenav('left').close(); // closes sidenav bar with md-component-id equal to 'left'
		};

		// 
		$scope.saveClassified = function(classified) {
			if (classified) { // makes sure there is at least one property on the classified object being created before it can be saved
				classified.contact = contact; // sets contact as default contact
				$scope.classifieds.push(classified); // appends newly created classified object to list of existing classifieds
				$scope.classified = {}; // clears form once new object has been saved/added
				$scope.closeSidebar(); // closes sidebar once new classified object has been created
				showToast("Classified saved!"); // passes message to toast function for popup display
			}
			
		};

		$scope.editClassified = function(classified) {
			$scope.editing = true; // sets editing variable to true so that in index.html DOM, the "save" button disappears but the "save edit" button appears
			$scope.openSidebar(); // calls openSidebar function and performs behaviour settings detailed in the function
			$scope.classified = classified; // sets form fields to contain current object values
		};

		$scope.saveEdit = function() {
			$scope.editing = false; // once edits have been made, editing is set to false so that "save" button appears on form and "save edit" button disappears
			$scope.classified = {}; // clears form once object has been edited
			$scope.closeSidebar(); // calls closeSidebar function and performs behaviour settings detailed in the function
			showToast("Edit saved!"); // passes message to toast function for popup display
		};

		$scope.deleteClassified = function(event, classified) {
			// sets up confirm dialog functionality
			var confirm = $mdDialog.confirm() // creates confirm dialog and chains along dialog parameters
				.title('Are you sure you want to delete ' + classified.title + '?') //dialog box title
				.ok('Yes') // confirm button text
				.cancel('No') // cancel button text
				.targetEvent(event); // passed from the view into this method. make sure to close out with a semicolon (;)

			// shows dialog box
			// show method returns an asynchronous promise and then proceeds to then function. then function details what we want to happen when 'yes' and 'no' are chosen
			$mdDialog.show(confirm).then(function() {
				var index = $scope.classifieds.indexOf(classified); // gets position in the classifieds array of the target classified
				$scope.classifieds.splice(index, 1); // similar to Excel MID() function -- splits the classifieds array beginning at the index position and the length is defined by the second parameter
			}, function() {
				// what to do when no is selected. currently set to do nothing
			});

			
		};

		// toast function used in other functions above. notice difference in function declaration
		function showToast(message) {
			$mdToast.show(
				$mdToast.simple()
				.content(message)
				.position('top, right')
				.hideDelay(3000)
			);
		};

		function getCategories(classifieds) {

			var categories = []; // declares empty array

			// loops through the classifieds json objects, gets all the categories and appends them to the categories array
			angular.forEach(classifieds, function(item) {
				angular.forEach(item.categories, function(category) {
					categories.push(category);
				});
			});

			// takes the categories array and uses lodash to return all the unique values of category
			return _.uniq(categories);
		};
	});

})();
	(function() {

	// THIS CONTROLLER HANDLES LISTING ALL THE CLASSIFIEDS
	"use strict";

	angular
	.module("ngClassifieds")
	//add dependency injections in function parameters below e.g. $scope, $mdSidenav, etc.
	.controller("classifiedsCtrl", function($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) { 

		// to use this keyword to combine all methods and properties to this controller using the capture variable (vm) instead of $scope
		var vm = this;
		
		// members pointing to all the functions and properties contained within this controller
		vm.categories;
		vm.classified;
		vm.classifieds;
		vm.closeSidebar = closeSidebar;
		vm.deleteClassified = deleteClassified;
		vm.editClassified = editClassified;
		vm.editing;
		vm.openSidebar = openSidebar;
		vm.saveClassified = saveClassified;
		vm.saveEdit = saveEdit;		

		vm.classifieds = classifiedsFactory.ref;
		// waits until all classifieds are loaded and then gets all the available categories
		vm.classifieds.$loaded().then(function(classifieds){
			vm.categories = getCategories(classifieds);
		});

		// we use $on to receive the new classified object from the child controller (classifieds.new.ctr.js $emit)
		$scope.$on('newClassified', function(event, classified) {
			vm.classifieds.$add(classified);
			showToast('Classified saved!');
		});

		$scope.$on('editSaved', function(event, message) {
			showToast(message);
		});

		// establishes default contact for use with any newly created classifieds ad
		var contact = "Sergio L"

		// behaviour settings for opening sidenav bar
		function openSidebar() {
			// $mdSidenav('left').open(); // opens sidenav bar with md-component-id equal to 'left'
			$state.go('classifieds.new');
		}

		// behaviour settings for closing sidenav bar
		function closeSidebar() {
			$mdSidenav('left').close(); // closes sidenav bar with md-component-id equal to 'left'
		}

		// 
		function saveClassified(classified) {
			if (classified) { // makes sure there is at least one property on the classified object being created before it can be saved
				classified.contact = contact; // sets contact as default contact
				vm.classifieds.push(classified); // appends newly created classified object to list of existing classifieds
				vm.classified = {}; // clears form once new object has been saved/added ***
				closeSidebar(); // closes sidebar once new classified object has been created
				showToast("Classified saved!"); // passes message to toast function for popup display
			}
			
		}

		function editClassified(classified) {
			$state.go('classifieds.edit', { // second argument contains URL parameters we want to pass
				id: classified.$id, // id of the classified that we want to edit. it will show up in the URL; $id lines up with firebase id
			});
		}

		function saveEdit() {
			vm.editing = false; // once edits have been made, editing is set to false so that "save" button appears on form and "save edit" button disappears
			vm.classified = {}; // clears form once object has been edited
			closeSidebar(); // calls closeSidebar function and performs behaviour settings detailed in the function
			showToast("Edit saved!"); // passes message to toast function for popup display
		}

		function deleteClassified(event, classified) {
			// sets up confirm dialog functionality
			var confirm = $mdDialog.confirm() // creates confirm dialog and chains along dialog parameters
				.title('Are you sure you want to delete ' + classified.title + '?') //dialog box title
				.ok('Yes') // confirm button text
				.cancel('No') // cancel button text
				.targetEvent(event); // passed from the view into this method. make sure to close out with a semicolon (;)

			// shows dialog box
			// show method returns an asynchronous promise and then proceeds to then function. then function details what we want to happen when 'yes' and 'no' are chosen
			$mdDialog.show(confirm).then(function() {
				vm.classifieds.$remove(classified);
				showToast('Classified deleted!');
			}, function() {
				// what to do when no is selected. currently set to do nothing
			});

			
		}

		// toast function used in other functions above. notice difference in function declaration
		function showToast(message) {
			$mdToast.show(
				$mdToast.simple()
				.content(message)
				.position('top, right')
				.hideDelay(3000)
			);
		}

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
		}

		
	});

})();
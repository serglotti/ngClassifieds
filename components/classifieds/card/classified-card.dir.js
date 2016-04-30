(function() {

	"use strict";
	angular
		.module("ngClassifieds")
		.directive("classifiedCard", function() {
			return {
				templateUrl: "components/classifieds/card/classified-card.tpl.html",
				scope: {
					classifieds: "=classifieds",
					classifiedsFilter: "=classifiedsFilter",
					category: "=category"
				},
				controller: classifiedCardController,
				controllerAs: "vm"
			}

			function classifiedCardController($state, $scope, $mdDialog) {
				
				var vm = this;
				vm.editClassified = editClassified;
				vm.deleteClassified = deleteClassified;

				function editClassified(classified) {
					$state.go('classifieds.edit', { // second argument contains URL parameters we want to pass
						id: classified.$id, // id of the classified that we want to edit. it will show up in the URL; $id lines up with firebase id
					});
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

			}
		})
})();
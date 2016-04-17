angular
	.module("ngClassifieds", ["ngMaterial", "ui.router"])
	.config(function($mdThemingProvider, $stateProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('pink')
			.accentPalette('purple');

		$stateProvider
			.state('stateone', {
				url: '/stateone',
				template: '<h1> {{ stateOne.message }} </h1>',
				controller: 'stateOneCtrl as stateOne'
			})
			.state('statetwo', {
				url: '/statetwo',
				template: '<h1>State Two</h1> <md-button ui-sref="two.more">Go to nested state</md-button><ui-view></ui-view>'
			})
			.state('two.more', {
				url: '/more',
				template: '<p>This is a deeper state</p>'
			});
		
	})
	.controller('stateOneCtrl', function() {
		var vm = this; // used to avoid $scope soup from occurring within our app. also eliminates need for $scope to be injected into the function
		vm.message = 'Hey from State One';
	});


	// .directive("helloWorld", function() {
	// 	return {
	// 		template: "<h1> {{ message }} </h1>"
	// 	}
	// });
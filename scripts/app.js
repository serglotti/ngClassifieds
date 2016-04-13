angular
	.module("ngClassifieds", ["ngMaterial"])
	.config(function($mdThemingProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('pink')
			.accentPalette('purple');
	})
	.directive("helloWorld", function() {
		return {
			template: "<h1> {{ message }} </h1>"
		}
	});
angular
	.module("ngClassifieds", ["ngMaterial"])
	.config(function($mdThemingProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('indigo')
			.accentPalette('orange');
	})
	.directive("helloWorld", function() {
		return {
			template: "<h1> {{ message }} </h1>"
		}
	});
angular
	.module("ngClassifieds", ["ngMaterial", "ui.router"])
	.config(function($mdThemingProvider, $stateProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('pink')
			.accentPalette('purple');

		$stateProvider
			.state('classifieds', {
				url: '/classifieds',
				templateURL: 'components/classifieds/classifieds.tpl.html',
				controller: 'classifiedsCtrl as vm' // vm simply stands for view model and is the alias for this controller
		});
		
	});
 
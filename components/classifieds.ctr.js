(function() {

	"use strict";

	angular
	.module("ngClassifieds")
	.controller("classifiedsCtrl", function($scope) {

		$scope.classifieds = [

		{
			"title":"Intense Mas Band",
			"price":500,
			"description":"Hosted by DJ Rusty G, Team Soca and Vibe 103",
			"image":"https://static.wixstatic.com/media/53b8c6_669a33a1d86e47a08af88fd34bd1e1b6.png/v1/fill/w_615,h_363,al_c,usm_0.66_1.00_0.01/53b8c6_669a33a1d86e47a08af88fd34bd1e1b6.png",
			"contact":"Sergio Lottimore"
		},

		{
			"title":"Nova Mas Intl",
			"price":1500,
			"description":"Hosted by Unknown Artists",
			"image":"https://scontent-lga3-1.xx.fbcdn.net/hphotos-xat1/v/t1.0-9/12241508_968741343171600_5495063994937153209_n.png?oh=360f41ac1451ab75066a66b5af07dec6&oe=578564D2",
			"contact":"Lorenzo Lottimore"
		},

		{
			"title":"CodeRed Bermuda",
			"price":2500,
			"description":"Hosted by King Bubba & Lyrikal",
			"image":"http://coderedbda.com/wp-content/uploads/2015/12/logo-1.png",
			"contact":"DeLeon Lottimore"
		}

		];

	});

})();
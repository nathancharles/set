/*global require*/
'use strict';

require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		bootstrap: {
			deps: ['jquery'],
			exports: 'jquery'
		}
	},
	paths: {
		jquery: '../bower_components/jquery/dist/jquery',
		backbone: '../bower_components/backbone/backbone',
		underscore: '../bower_components/underscore/underscore',
		bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
		cardModel: 'models/card',
		gameModel: 'models/game',
		playerModel: 'models/player',
		cardsCollection: 'collections/cards',
		cardView: 'views/card',
		handView: 'views/hand'
	}
});

require([
	'backbone',
	'cardsCollection',
	'handView',
	'gameModel'
], function (Backbone, Cards, HandView, Game) {
	Backbone.history.start();
	window.game = new Game();
	window.view = new HandView(game.deck);
});

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
		cardsView: 'views/cards',
		playerView: 'views/player',
		gameView: 'views/game'
	}
});

require([
	'backbone',
	'gameModel',
	'gameView'
], function (Backbone, Game, GameView) {
	Backbone.history.start();
	window.game = new Game();
	window.view = new GameView(game);
});

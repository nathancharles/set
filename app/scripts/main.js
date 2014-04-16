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
		handCollection: 'collections/hand',
		deckCollection: 'collections/deck',
		cardView: 'views/card'
	}
});

require([
	'backbone',
	'deckCollection'
], function (Backbone, Deck) {
	Backbone.history.start();
	window.deck = new Deck();
});

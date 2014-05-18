/* globals alert */

define([
	'backbone',
	'underscore',
	'cardsView'
], function (Backbone, _, CardsView) {
	'use strict';

	var GameView = Backbone.View.extend({
		template: _.template($('#hand-template').html()),
		initialize: function initialize(game) {
			this.validSets = 0;
			this.game = game;
			this.handView = new CardsView({collection: this.game.hand, el: $('.jumbotron')});
			this.game.deck.shuffle();
			this.game.deal();
			this.listenTo(this.game.hand, 'threeSelected', this.checkSet);
			this.render();
			// this.game.deck.on('change:selected', console.log(event), this);
		},
		render: function render() {
			this.validSets = this.getValidSets(this.game.hand.models);
			this.handView.render();
			return this;
		},
		checkSet: function checkSet(selectedCards) {
			var isValidSet = this.validateSet(selectedCards);
			if(isValidSet) {
				alert('it\'s a set!');
			} else {
				alert('try again!');
			}
		},
		/**
		 * Validate a set of given cards
		 * A group of cards is a valid set if, for each of the different attributes, the attributes are all the same or all different.
		 * @param {Array} cards - An array of cards to check
		 * @return {Boolean} If the set of cards makes a valid set
		 */
		validateSet: function validateSet(cards) {
			var self = this;

			function isAttributeValid(attributes) {
				attributes = _.uniq(attributes);
				return attributes.length === 1 || attributes.length === self.game.getAttributeQuantity();
			}

			// TODO: abstract to attribute values on collection

			var colors = [],
			shapes = [],
			patterns = [],
			quantities = [];

			_.each(cards, function(card) {
				colors.push(card.get('color'));
				shapes.push(card.get('shape'));
				patterns.push(card.get('pattern'));
				quantities.push(card.get('quantity'));
			});

			if(isAttributeValid(colors) &&
				isAttributeValid(shapes) &&
				isAttributeValid(patterns) &&
				isAttributeValid(quantities)) {
				return true;
			}
			return false;
		},
		/**
		 * Get the count of valid sets in given cards
		 * @param {Array} cards - An array of cards to check
		 * @return {Integer} The number of valid sets the hand contains
		 */
		getValidSets : function getValidSets(cards) {
			var self = this;
			var validSets = 0;
			// TODO: This can be done better
			for(var i = 0, length = cards.length; i < length; i+=1) {
				for(var j = i+1; j < length; j+=1) {
					for(var k = j+1; k < length; k+=1) {
						if(self.validateSet([cards[i], cards[j], cards[k]])){
							validSets += 1;
						}
					}
				}
			}
			return validSets;
		}
	});
	return GameView;
});

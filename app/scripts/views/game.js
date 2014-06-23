/* globals alert */

define([
	'backbone',
	'underscore',
	'cardsView',
	'playerView'
], function (Backbone, _, CardsView, PlayerView) {
	'use strict';

	var HAND_SIZE = 12;

	var GameView = Backbone.View.extend({
		initialize: function initialize(game) {
			this.validSets = 0;
			this.game = game;
			this.deal();

			this.handView = new CardsView({collection: this.game.hand, el: $('#hand')});
			this.playerView = new PlayerView({model: this.game.player, el: $('#player')});

			this.listenTo(this.game.hand, 'threeSelected', this.checkSet);

			this.render();
			// this.game.deck.on('change:selected', console.log(event), this);
		},
		render: function render() {
			this.handView.render();
			this.playerView.render();
			return this;
		},

		deal: function deal() {
			var self = this;
			var numberNeeded = HAND_SIZE - self.game.hand.length;
			_.times(numberNeeded, function() {
				self.game.hand.add(self.game.deck.pop());
			});
			this.calculateValidSets(this.game.hand.models);
			if(this.validSets === 0){
				// TODO: Use a modal to show this
				alert('Game Over. There are no more sets.');
				this.reset();
			}
		},

		givePlayerSet: function givePlayerSet(selectedCards) {
			// Clone the array, so when it is added back, it isn't seen as the same thing
			var arr = this.game.player.get('sets').slice(0);
			arr.push(this.game.hand.remove(selectedCards));
			this.game.player.set('sets', arr);
			// this.game.player.set({sets: this.game.player.get('sets').push(this.game.hand.remove(selectedCards))});
		},

		checkSet: function checkSet(selectedCards) {
			var setValidation = this.setValidation(selectedCards);
			var message;
			var messageClass;

			if(setValidation.isValid) {
				// TODO: Use a different method to show this
				message = 'It\'s a set!';
				messageClass = 'success';
				this.givePlayerSet(selectedCards);
				this.deal();
			} else {
				// TODO: Use a different method to show this
				message = 'Try Again!';
				messageClass = 'danger';
			}
			this.game.player.set('message', {class: messageClass, text: message});
		},
		/**
		 * Validate a set of given cards
		 * A group of cards is a valid set if, for each of the different attributes, the attributes are all the same or all different.
		 * @param {Array} cards - An array of cards to check
		 * @return {Object} If the set of cards makes a valid set
		 */
		setValidation: function setValidation(cards) {
			var self = this;
			var attributeTypes = this.game.getAttributeTypes();
			var validation = {};

			function isAttributeValid(attributes) {
				attributes = _.uniq(attributes);
				return attributes.length === 1 || attributes.length === self.game.getAttributeQuantity();
			}

			_.each(cards, function(card) {
				_.each(attributeTypes, function(type) {
					validation[type] = validation[type] || [];
					validation[type].push(card.get(type));
				});

			});

			_.each(attributeTypes, function(type) {
				validation[type] = isAttributeValid(validation[type]);
			});
			
			validation.isValid = !_.contains(_.values(validation), false);

			return validation;
		},
		/**
		 * Get the count of valid sets in given cards
		 * @param {Array} cards - An array of cards to check
		 * @return {Integer} The number of valid sets the hand contains
		 */
		calculateValidSets : function calculateValidSets(cards) {
			var self = this;
			var amount = 0;
			// TODO: This can be done better
			for(var i = 0, length = cards.length; i < length; i+=1) {
				for(var j = i+1; j < length; j+=1) {
					for(var k = j+1; k < length; k+=1) {
						if(self.setValidation([cards[i], cards[j], cards[k]]).isValid){
							amount += 1;
						}
					}
				}
			}
			this.validSets = amount;
		},
		reset: function reset() {
			this.game.constructor();
			this.initialize(this.game);
		}
	});
	return GameView;
});

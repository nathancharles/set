define([
	'backbone',
	'underscore',
	'cardView'
], function (Backbone, _, CardView) {
	'use strict';

	var CardsView = Backbone.View.extend({
		template: _.template($('#hand-template').html()),
		initialize: function initialize() {
			this.cards = this.collection;
			this.listenTo(this.cards, 'shuffle', this.render);
			this.listenTo(this.cards, 'add', this.render);
			this.listenTo(this.cards, 'remove', this.render);
			this.listenTo(this.cards, 'change', this.checkForThree);
			// this.render();
		},
		render: function render() {
			var self = this;
			self.$el.empty();
			_.each(this.cards.models, function(card) {
				self.$el.append(new CardView(card).render().el);
			});
			return this;
		},
		checkForThree: function checkForThree() {
			var selectedCards = this.cards.where({'selected': true});
			if(selectedCards.length === 3) {
				this.cards.trigger('threeSelected', selectedCards);
				this.cards.invoke('set',{'selected':false});
			}
		}
	});
	return CardsView;
});

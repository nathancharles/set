define([
	'backbone',
	'underscore',
	'cardView'
], function (Backbone, _, CardView) {
	'use strict';

	var CardsView = Backbone.View.extend({
		initialize: function initialize() {
			this.listenTo(this.collection, 'shuffle', this.render);
			this.listenTo(this.collection, 'add', this.render);
			this.listenTo(this.collection, 'remove', this.render);
			this.listenTo(this.collection, 'change', this.checkForThree);
		},
		render: function render() {
			var self = this;
			self.$el.empty();
			_.each(this.collection.models, function(card) {
				self.$el.append(new CardView(card).render().el);
			});
			return this;
		},
		checkForThree: function checkForThree() {
			var selectedCards = this.collection.where({'selected': true});
			if(selectedCards.length === 3) {
				this.collection.trigger('threeSelected', selectedCards);
				this.collection.invoke('set',{'selected':false});
			}
		}
	});
	return CardsView;
});

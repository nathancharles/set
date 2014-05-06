define([
	'backbone',
	'underscore',
	'cardView'
], function (Backbone, _, CardView) {
	'use strict';

	var HandView = Backbone.View.extend({
		el: $('.jumbotron'),
		hand: null,
		template: _.template($('#hand-template').html()),
		initialize: function initialize(hand) {
			this.hand = hand;
			this.listenTo(this.hand, 'shuffle', this.render);
			this.hand.on('change:selected', this.checkSet, this);
			this.render();
		},
		render: function render() {
			var self = this;
			self.$el.empty();
			_.each(this.hand.models, function(card) {
				self.$el.append(new CardView(card).render().el);
			});
			return this;
		},
		checkSet: function checkSet() {
			var areThreeSelected = this.hand.where({selected: true}).length === 3;
			if(areThreeSelected) {
				this.validateSet(this.hand.where({selected: true}));
				this.hand.invoke('set', {selected: false});
			}
		},
		validateSet: function validateSet(cards) {
			var self = this;

			function isAttributeValid(attributes) {
				attributes = _.uniq(attributes);
				return attributes.length === 1 || attributes.length === self.hand.getAttributeQuantity();
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
				alert("it's a set!");
			} else {
				alert('try again');
			}
		}
	});
	return HandView;
});

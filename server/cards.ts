import {Cards} from 'collections/cards';

Meteor.publish('cards', function() {
	return Cards.find({});
});

Meteor.publish('card', function(cardId) {
	return Cards.find({_id: cardId});
});

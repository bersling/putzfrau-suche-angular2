export var Cards = new Mongo.Collection<Card>('cards');

Cards.allow({
	insert: function(card: Object) {
		return true;
	},
	update: function(card: Object) {
		return true;
	},
	remove: function(card: Object) {
		return true;
	}
});

this.Navigation = new Mongo.Collection("navigation");

this.Navigation.userCanInsert = function(userId, doc) {
	return true;
}

this.Navigation.userCanUpdate = function(userId, doc) {
	return true;
}

this.Navigation.userCanRemove = function(userId, doc) {
	return true;
}

this.Schemas = this.Schemas || {};

this.Schemas.Navigation = new SimpleSchema({
});

this.Navigation.attachSchema(this.Schemas.Navigation);

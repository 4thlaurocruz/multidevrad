this.Sad = new Mongo.Collection("sad");

this.Sad.userCanInsert = function(userId, doc) {
	return true;
}

this.Sad.userCanUpdate = function(userId, doc) {
	return true;
}

this.Sad.userCanRemove = function(userId, doc) {
	return true;
}

this.Schemas = this.Schemas || {};

this.Schemas.Sad = new SimpleSchema({
});

this.Sad.attachSchema(this.Schemas.Sad);

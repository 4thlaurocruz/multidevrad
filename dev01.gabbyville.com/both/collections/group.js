this.Group = new Mongo.Collection("group");

this.Group.userCanInsert = function(userId, doc) {
	return true;
}

this.Group.userCanUpdate = function(userId, doc) {
	return true;
}

this.Group.userCanRemove = function(userId, doc) {
	return true;
}

this.Schemas = this.Schemas || {};

this.Schemas.Group = new SimpleSchema({
});

this.Group.attachSchema(this.Schemas.Group);

Navigation.allow({
	insert: function (userId, doc) {
		return Navigation.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Navigation.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Navigation.userCanRemove(userId, doc);
	}
});

Navigation.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Navigation.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Navigation.before.remove(function(userId, doc) {
	
});

Navigation.after.insert(function(userId, doc) {
	
});

Navigation.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Navigation.after.remove(function(userId, doc) {
	
});

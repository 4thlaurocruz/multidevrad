Charts.allow({
	insert: function (userId, doc) {
		return Charts.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Charts.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Charts.userCanRemove(userId, doc);
	}
});

Charts.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Charts.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Charts.before.remove(function(userId, doc) {
	
});

Charts.after.insert(function(userId, doc) {
	
});

Charts.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Charts.after.remove(function(userId, doc) {
	
});

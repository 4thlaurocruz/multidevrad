Sdfsdfsdf.allow({
	insert: function (userId, doc) {
		return Sdfsdfsdf.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Sdfsdfsdf.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Sdfsdfsdf.userCanRemove(userId, doc);
	}
});

Sdfsdfsdf.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Sdfsdfsdf.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Sdfsdfsdf.before.remove(function(userId, doc) {
	
});

Sdfsdfsdf.after.insert(function(userId, doc) {
	
});

Sdfsdfsdf.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Sdfsdfsdf.after.remove(function(userId, doc) {
	
});

Hjjkhkkh.allow({
	insert: function (userId, doc) {
		return Hjjkhkkh.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Hjjkhkkh.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Hjjkhkkh.userCanRemove(userId, doc);
	}
});

Hjjkhkkh.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Hjjkhkkh.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Hjjkhkkh.before.remove(function(userId, doc) {
	
});

Hjjkhkkh.after.insert(function(userId, doc) {
	
});

Hjjkhkkh.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Hjjkhkkh.after.remove(function(userId, doc) {
	
});

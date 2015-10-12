Meteor.publish("groups", function() {
	return Group.find({}, {});
});

Meteor.publish("groups_empty", function() {
	return Group.find({_id:null}, {});
});

Meteor.publish("group", function() {
	return Group.find({}, {});
});


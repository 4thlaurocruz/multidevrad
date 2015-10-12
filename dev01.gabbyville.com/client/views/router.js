Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

var publicRoutes = [
	"home_public",
	"login",
	"register",
	"forgot_password",
	"reset_password"
];

var privateRoutes = [
	"tenant",
	"tenant.dashboard",
	"tenant.presence",
	"tenant.call_history",
	"tenant.task",
	"tenant.scripts",
	"tenant.calendar",
	"tenant.phone_book",
	"tenant.billing",
	"tenant.faq",
	"tenant.my_account",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_password",
	"logout",
	"admin",
	"agent",
	"supervisor",
	"twilio",
	"home_private"
];

var freeRoutes = [
	
];

var roleMap = [
	{ route: "admin",	roles: ["admin"] },
	{ route: "agent",	roles: ["admin","supervisor","agent"] },
	{ route: "supervisor",	roles: ["supervisor","admin"] },
	{ route: "twilio",	roles: ["admin","twilio"] }
];

this.firstGrantedRoute = function(preferredRoute) {
	if(preferredRoute && routeGranted(preferredRoute)) return preferredRoute;

	var grantedRoute = "";

	_.every(privateRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(publicRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(freeRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	if(!grantedRoute) {
		// what to do?
		console.log("All routes are restricted for current user.");
	}

	return "";
}

// this function returns true if user is in role allowed to access given route
this.routeGranted = function(routeName) {
	if(!routeName) {
		// route without name - enable access (?)
		return true;
	}

	if(!roleMap || roleMap.length === 0) {
		// this app don't have role map - enable access
		return true;
	}

	var roleMapItem = _.find(roleMap, function(roleItem) { return roleItem.route == routeName; });
	if(!roleMapItem) {
		// page is not restricted
		return true;
	}

	if(!Meteor.user() || !Meteor.user().roles) {
		// user is not logged in
		return false;
	}

	// this page is restricted to some role(s), check if user is in one of allowedRoles
	var allowedRoles = roleMapItem.roles;
	var granted = _.intersection(allowedRoles, Meteor.user().roles);
	if(!granted || granted.length === 0) {
		return false;
	}

	return true;
};

Router.ensureLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		return;
	}

	if(!Meteor.userId()) {
		// user is not logged in - redirect to public home
		var redirectRoute = firstGrantedRoute("home_public");
		this.redirect(redirectRoute);
	} else {
		// user is logged in - check role
		if(!routeGranted(this.route.getName())) {
			// user is not in allowedRoles - redirect to first granted route
			var redirectRoute = firstGrantedRoute("home_private");
			this.redirect(redirectRoute);
		} else {
			this.next();
		}
	}
};

Router.ensureNotLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		return;
	}

	if(Meteor.userId()) {
		var redirectRoute = firstGrantedRoute("home_private");
		this.redirect(redirectRoute);
	}
	else {
		this.next();
	}
};

// called for pages in free zone - some of pages can be restricted
Router.ensureGranted = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		return;
	}

	if(!routeGranted(this.route.getName())) {
		// user is not in allowedRoles - redirect to first granted route
		var redirectRoute = firstGrantedRoute("");
		this.redirect(redirectRoute);
	} else {
		this.next();
	}
};

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("home_public", {path: "/", controller: "HomePublicController"});
	this.route("login", {path: "/login", controller: "LoginController"});
	this.route("register", {path: "/register", controller: "RegisterController"});
	this.route("forgot_password", {path: "/forgot_password", controller: "ForgotPasswordController"});
	this.route("reset_password", {path: "/reset_password/:resetPasswordToken", controller: "ResetPasswordController"});
	this.route("tenant", {path: "/tenant", controller: "TenantController"});
	this.route("tenant.dashboard", {path: "/tenant/dashboard", controller: "TenantDashboardController"});
	this.route("tenant.presence", {path: "/tenant/presence", controller: "TenantPresenceController"});
	this.route("tenant.call_history", {path: "/tenant/call_history", controller: "TenantCallHistoryController"});
	this.route("tenant.task", {path: "/tenant/task", controller: "TenantTaskController"});
	this.route("tenant.scripts", {path: "/tenant/scripts", controller: "TenantScriptsController"});
	this.route("tenant.calendar", {path: "/tenant/calendar", controller: "TenantCalendarController"});
	this.route("tenant.phone_book", {path: "/tenant/phone_book", controller: "TenantPhoneBookController"});
	this.route("tenant.billing", {path: "/tenant/billing", controller: "TenantBillingController"});
	this.route("tenant.faq", {path: "/tenant/faq", controller: "TenantFaqController"});
	this.route("tenant.my_account", {path: "/tenant/my_account", controller: "TenantMyAccountController"});
	this.route("user_settings", {path: "/user_settings", controller: "UserSettingsController"});
	this.route("user_settings.profile", {path: "/user_settings/profile", controller: "UserSettingsProfileController"});
	this.route("user_settings.change_password", {path: "/user_settings/change_password", controller: "UserSettingsChangePasswordController"});
	this.route("logout", {path: "/logout", controller: "LogoutController"});
	this.route("admin", {path: "/admin", controller: "AdminController"});
	this.route("agent", {path: "/agent", controller: "AgentController"});
	this.route("supervisor", {path: "/supervisor", controller: "SupervisorController"});
	this.route("twilio", {path: "/twilio", controller: "TwilioController"});
	this.route("home_private", {path: "/home_private", controller: "HomePrivateController"});
});

let controller = RouteController.extend({
    layoutTemplate: "Layout_Main",
    loadingTemplate: "Pages_Loading",
    waitOn: function () {
        if (Meteor.userId())
            return Meteor.subscribe("layout.main");
    },
    onBeforeAction: function () {
        if (!Meteor.userId())
            this.redirect("Login");
        else
            this.next();
    },
    action: function () {
        if (this.ready())
            this.render("Pages_" + (this.route.options.hasOwnProperty("template") ? this.route.options.template : this.route.getName()));
        else
            this.next();
    }
});

Router.route("/", {
    name: "Home",
    controller: controller
});

Router.route("/config", {
    name: "Config",
    controller: controller,
    waitOn: function () {
        return Meteor.subscribe("pages.config");
    }
});

Router.route("/test-users", {
    name: "TestUsers",
    controller: controller
});
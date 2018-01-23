let controller = RouteController.extend({
    layoutTemplate: "Layout_Main",
    loadingTemplate: "Pages_Loading",
    onBeforeAction: function() {
        if (Meteor.userId())
            this.redirect("Home");
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

Router.route("/login", {
    name: "Login",
    controller: controller
});
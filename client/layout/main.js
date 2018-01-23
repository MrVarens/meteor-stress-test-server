Template.Layout_Main.onCreated(function() {
    this.isRunning = new ReactiveVar(false);
    this.startBlockTime = new ReactiveVar(0);
    this.startBlockTimeInterval;

    this.autorun(() => {
        var control = Collections.Control.findOne();
        this.isRunning.set(control && control.isRunning);

        if (!control)
            return;

        var startBlockTime = control.getStartBlockTime();
        if (startBlockTime > 0) {
            this.startBlockTime.set(startBlockTime);

            if (this.startBlockTimeInterval)
                clearInterval(this.startBlockTimeInterval);

            this.startBlockTimeInterval = setInterval(() => {
                startBlockTime = control.getStartBlockTime();
                this.startBlockTime.set(startBlockTime);

                if (startBlockTime <= 0) {
                    clearInterval(this.startBlockTimeInterval);
                    this.startBlockTimeInterval = null;
                }
            }, 1000);
        }
    });

});

Template.Layout_Main.onRendered(function() {});

Template.Layout_Main.onDestroyed(function() {});

Template.Layout_Main.helpers({
    currentRouteName: function() {
        return changeCase.paramCase(Router.current().route.getName());
    },
    isRunning: function () {
        return Template.instance().isRunning.get();
    },
    startBlockTime: function () {
        return Template.instance().startBlockTime.get();
    }
});

Template.Layout_Main.events({
    "click .navbar .logout": function (event, template) {
        Meteor.logout();
    },
    "click .change-state": function (event, template) {
        Meteor.call("config.changeState", !template.isRunning.get(), function (error, result) {
            if (error != null)
                sAlert.error("Unable to change state: " + error.reason);
        });
    }
});
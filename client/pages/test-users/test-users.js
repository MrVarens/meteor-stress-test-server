Template.Pages_TestUsers.onCreated(function() {});

Template.Pages_TestUsers.onRendered(function() {});

Template.Pages_TestUsers.onDestroyed(function() {});

Template.Pages_TestUsers.helpers({});

Template.Pages_TestUsers.events({
    "click .actions-add": function (event, template) {
        Modal.show("Pages_TestUsers_Add");
    },
    "click .actions-clear": function (event, template) {
        Modal.show("Modals_Confirmation", function () {
            return {
                title: "Test users - Clear",
                text: "Do you want to clear all test users?",
                onAccept: function () {
                    Meteor.call("testUsers.clear", function (error, result) {
                        if (error)
                            sAlert.error("Unable to clear test users: " + error.reason);
                        else
                            sAlert.info("Test users successfully cleared");
                    });
                }
            };
        });
    }
});
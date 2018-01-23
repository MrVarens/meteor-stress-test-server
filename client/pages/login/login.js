Template.Pages_Login.onCreated(function() {
    AutoForm.addHooks("autoform-login", {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            Meteor.loginWithPassword(insertDoc.username, insertDoc.password, (error) => {
                this.done(error);
            });

            return false; // Block form submit
        }
    }, true);
});

Template.Pages_Login.onRendered(function() {});

Template.Pages_Login.onDestroyed(function() {});

Template.Pages_Login.helpers({});

Template.Pages_Login.events({});
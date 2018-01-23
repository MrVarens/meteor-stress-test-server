Template.Pages_TestUsers_Add.onCreated(function() {
    var self = this;

    AutoForm.addHooks("autoform-test-users-add", {
        onSuccess: function(formType, result) {
            Modal.hide(self);
        }
    }, true);
});

Template.Pages_TestUsers_Add.onRendered(function() {});

Template.Pages_TestUsers_Add.onDestroyed(function() {});

Template.Pages_TestUsers_Add.helpers({});

Template.Pages_TestUsers_Add.events({
    "click .actions-add": function (event, template) {
        template.$("#autoform-test-users-add").submit();
    }
});
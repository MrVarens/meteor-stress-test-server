Template.Modals_Confirmation.onCreated(function () {});

Template.Modals_Confirmation.onRendered(function () {});

Template.Modals_Confirmation.onDestroyed(function () {});

Template.Modals_Confirmation.helpers({
    confirmButtonText: function () {
        var template = Template.instance();
        return (template.data.confirmButtonText ? template.data.confirmButtonText : "Yes");
    },
    rejectButtonText: function () {
        var template = Template.instance();
        return (template.data.rejectButtonText ? template.data.rejectButtonText : "No");
    }
});

Template.Modals_Confirmation.events({
    "click .button-confirm": function (event, template) {
        if (template.data.onAccept && typeof template.data.onAccept == "function")
            template.data.onAccept();

        Modal.hide(template);
    },
    "click .button-reject": function (event, template) {
        if (template.data.onReject && typeof template.data.onReject == "function")
            template.data.onReject();

        Modal.hide(template);
    }
});
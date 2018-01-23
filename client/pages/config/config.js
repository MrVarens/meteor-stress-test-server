Template.Pages_Config.onCreated(function() {});

Template.Pages_Config.onRendered(function() {
    this.autorun(() => {
        if (Globals.isEditEnabled.get()) {
            this.$("[data-schema-key]").removeAttr("readonly");
            this.$("button").removeAttr("disabled", "disabled");
        }
        else {
            this.$("[data-schema-key]").attr("readonly", "readonly");
            this.$("button").attr("disabled", "disabled");
        }
    });
});

Template.Pages_Config.onDestroyed(function() {});

Template.Pages_Config.helpers({
    doc: function () {
        return Collections.Config.findOne();
    }
});

Template.Pages_Config.events({});
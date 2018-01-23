import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "bootstrap/dist/js/bootstrap.min.js";

import dataTablesBootstrap from "datatables.net-bs";
import "datatables.net-bs/css/dataTables.bootstrap.css";

Meteor.startup(function () {
    AutoForm.addHooks(null, {
        onError: function (formType, errors) {
            if (!errors)
                return;

            switch (errors.error) {
                case 400:
                    this.template.formError.set(errors.reason);
                    break;
                case "validation-error":
                    AutoForm.getValidationContext(this.formId).addValidationErrors(errors.details);
                    break;
            }
        },
        beginSubmit: function() {
            let self = this;
            let template = this.template;

            if (!template.hasOwnProperty("formError")) { // Init
                template.formError = new ReactiveVar("");

                template.autorun(function() {
                    template.$("#" + self.formId + " .form-error").text(template.formError.get());
                });
            }
            else if (!!template.formError.get()) // Remove global form error if exists
                template.formError.set("");

            // Add error div
            if (template.$("#" + self.formId + " .form-error").length == 0)
                template.$("#" + this.formId).prepend("<div class=\"form-error\">" + template.formError.get() + "</div>");

            // Block form on submit
            this.template.$("[data-schema-key]").attr("readonly", "readonly");
            this.template.$("button").attr("disabled", "disabled");
        },
        endSubmit: function() {
            // Unblock form
            this.template.$("[data-schema-key]").removeAttr("readonly");
            this.template.$("button").removeAttr("disabled", "disabled");
        }
    }, true);

    // sAlert config
    sAlert.config({
        effect: "slide",
        offset: 80,
        onRouteClose: false,
        stack: {
            spacing: 10,
            limit: 3
        }
    });

    // Start block update
    var updateStartBlock = function () {
        var control = Collections.Control.findOne();

        Globals.isStartEnabled.set(!control || control.isStartEnabled());
        Globals.isEditEnabled.set(!control || control.isEditEnabled());

        return control;
    };

    Tracker.autorun(function () {
        var control = updateStartBlock();
        if (!control)
            return;

        var startBlockTime = control.getStartBlockTime();
        if (startBlockTime > 0) {
            setTimeout(() => {
                updateStartBlock();
            }, (startBlockTime * 1000) + 200);
        }
    });

    // Tabular styles init
    dataTablesBootstrap(window, $);
});
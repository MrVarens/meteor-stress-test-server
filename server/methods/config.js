Meteor.methods({
    "config.edit": function (doc) {
        if (!this.userId)
            throw new Meteor.Error(400, "Unauthorised access!");

        try {
            check(doc, Object);
            check(doc.modifier, Object);
            check(doc._id, String);
        } catch (e) { throw new Meteor.Error(400, "Document is incorrect!"); }

        FormSchemas.Config.validate(doc.modifier, { modifier: true });

        var config = Collections.Config.findOne(doc._id);
        if (!config)
            throw new Meteor.Error(400, "Config not exists");

        var control = Collections.Control.findOne();
        if (!control)
            throw new Meteor.Error(400, "Control not exists");

        if (!control.isEditEnabled())
            throw new Meteor.Error(400, "Editing is blocked");

        control.setStartBlockTime(5);
        Collections.Config.update(doc._id, doc.modifier);
    },
    "config.changeState": function (state) {
        if (!this.userId)
            throw new Meteor.Error(400, "Unauthorised access!");

        check(state, Boolean);

        var control = Collections.Control.findOne();
        if (!control)
            throw new Meteor.Error(400, "Control not exists");

        if (control.isRunning == state)
            return;

        if (state) {
            if (!control.isStartEnabled())
                throw new Meteor.Error(400, "Start is blocked for " + control.getStartBlockTime() + "s");
        }
        else
            control.setStartBlockTime();

        Collections.Control.update(control._id, { $set: { isRunning: state } });
    }
});
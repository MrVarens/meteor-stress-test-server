Meteor.methods({
    "testUsers.add": function (doc) {
        if (!this.userId)
            throw new Meteor.Error(400, "Unauthorised access!");

        try {
            check(doc, Object);
        } catch (e) { throw new Meteor.Error(400, "Document is incorrect!"); }

        FormSchemas.TestUsers.Add.validate(doc);

        var control = Collections.Control.findOne();
        if (!control)
            throw new Meteor.Error(400, "Control not exists");

        if (!control.isEditEnabled())
            throw new Meteor.Error(400, "Editing is blocked");

        var results = Papa.parse("login|password\n" + doc.data, {
            header: true,
            delimiter: '|',
            skipEmptyLines: true
        });

        if (results.errors.length > 0)
            throw new Meteor.Error(400, "Error while parsing data: " + results.errors[0].message);

        _.each(results.data, function (item) {
            Collections.TestUsers.remove({ login: item.login }); // Remove user if exists

            Collections.TestUsers.insert({ login: item.login, password: item.password });
        });
    },
    "testUsers.clear": function () {
        if (!this.userId)
            throw new Meteor.Error(400, "Unauthorised access!");

        var control = Collections.Control.findOne();
        if (!control)
            throw new Meteor.Error(400, "Control not exists");

        if (!control.isEditEnabled())
            throw new Meteor.Error(400, "Editing is blocked");

        Collections.TestUsers.remove({});
    }
});
Meteor.startup(function () {
    if (!Meteor.users.findOne()) {
        Accounts.createUser({
            username: "admin",
            password: "admin"
        });
    }

    if (!Collections.Config.findOne())
        Collections.Config.insert({});

    if (!Collections.Control.findOne())
        Collections.Control.insert({});
});
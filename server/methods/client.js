Meteor.methods({
    "client.reserveTestUsers": function () {
        var client = Collections.Clients.findOne(this.connection.id);
        if (!client)
            throw new Meteor.Error(400, "Unauthorised access!");

        var config = Collections.Config.findOne();
        if (!config)
            throw new Meteor.Error(400, "Config not exists");

        if (!config.sendTestUsers)
            return;

        return client.reserveTestUsers();
    },
    "client.stateUpdate": function (type, value) {
        check(type, String);
        check(value, Array);

        var client = Collections.Clients.findOne(this.connection.id);
        if (!client)
            throw new Meteor.Error(400, "Unauthorised access!");

        switch (type) {
            case "state":
                if (value.length < 2)
                    break;

                check(value[0], Number);
                check(value[1], String);

                client.updateState(value[0], value[1]);
                break;
            case "stories":
                if (value.length < 2)
                    break;

                check(value[0], Number);
                check(value[1], Number);

                client.updateStories(value[0], value[1]);
                break;
        }
    }
});
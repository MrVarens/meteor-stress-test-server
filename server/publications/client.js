Meteor.publish("client.init", function (token) {
    check(token, String);

    if (token != Config.CLIENT_PROTECTION_TOKEN)
        return this.ready();

    Collections.Clients.insert({
        _id: this.connection.id,
        address: this.connection.clientAddress
    });

    this.onStop(() => {
        var client = Collections.Clients.findOne(this.connection.id);
        if (client)
            client.onDisconnect();
    });

    return [
        Collections.Config.find({}, { limit: 1 }),
        Collections.Control.find({}, { limit: 1 })
    ];
});

Meteor.publish("client.testUsers", function () {
    var client = Collections.Clients.findOne(this.connection.id);
    if (!client)
        return this.ready();

    var config = Collections.Config.findOne();
    if (!config || !config.sendTestUsers)
        return this.ready();

    client.reserveTestUsers();

    this.onStop(() => {
        client.releaseTestUsers();
    });

    return client.getTestUsers({ fields: { login: 1, password: 1 }, limit: config.threadsPerClient });
});
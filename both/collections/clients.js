class Client {
    constructor(doc) {
        _.extend(this, doc);
    }

    getTestUsers(options) {
        return Collections.TestUsers.find({ reservedBy: this._id }, options);
    }

    reserveTestUsers() {
        var config = Collections.Config.findOne();
        if (!config)
            return;

        var count = Collections.TestUsers.find({ reservedBy: this._id }).count();

        for (var i = count; i < config.threadsPerClient; i++) {
            var user = Collections.TestUsers.update({ reservedBy: null }, { $set: { reservedBy: this._id } }, { sort: { _id: 1 } });
            if (!user)
                break;
        }
    }

    releaseTestUsers() {
        Collections.TestUsers.update({ reservedBy: this._id }, { $unset: { reservedBy: "" } }, { multi: true });
    }

    updateState(type, text) {
        Collections.Clients.update(this._id, { $set: { "state.type": type, "state.text": text } });
    }

    updateStories(running, executed) {
        Collections.Clients.update(this._id, { $set: { "stories.running": running, "stories.executed": executed } });
    }

    onDisconnect() {
        Collections.Clients.remove(this._id);
        this.releaseTestUsers();
    }
}

Collections.Clients = new Mongo.Collection("clients", {
    transform: (doc) => new Client(doc)
});
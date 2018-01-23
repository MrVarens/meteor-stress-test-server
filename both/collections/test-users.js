class TestUser {
    constructor(doc) {
        _.extend(this, doc);
    }

    getOwner(options) {
        if (this.reservedBy)
            return Collections.Clients.findOne(this.reservedBy, options);
    }
}

Collections.TestUsers = new Mongo.Collection("test-users", {
    transform: (doc) => new TestUser(doc)
});
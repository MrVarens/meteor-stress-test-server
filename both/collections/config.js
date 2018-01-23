class Config {
    constructor(doc) {
        _.extend(this, doc);
    }
}

Collections.Config = new Mongo.Collection("config", {
    transform: (doc) => new Config(doc)
});
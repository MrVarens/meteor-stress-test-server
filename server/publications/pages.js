Meteor.publish("pages.config", function () {
    if (!this.userId)
        return this.ready();

    return Collections.Config.find({}, { limit: 1 });
});
Meteor.publish("layout.main", function () {
    if (!this.userId)
        return this.ready();

    return Collections.Control.find({}, { limit: 1 });
});
class Control {
    constructor(doc) {
        _.extend(this, doc);
    }

    getStartBlockTime() {
        return Math.ceil((this.startEnabledAt.getTime() - new Date().getTime()) / 1000);
    }

    setStartBlockTime(time = 10) {
        var now = moment().add(time, "seconds").toDate();
        var cur = moment(this.startEnabledAt).toDate();

        Collections.Control.update(this._id, { $set: { startEnabledAt: Math.max(now, cur) } });
    }

    isStartEnabled() {
        return this.getStartBlockTime() <= 0;
    }

    isEditEnabled() {
        return !this.isRunning;
    }
}

Collections.Control = new Mongo.Collection("control", {
    transform: (doc) => new Control(doc)
});
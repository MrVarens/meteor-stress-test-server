var state = new SimpleSchema({
    type: {
        type: Number,
        min: 0,
        allowedValues: _.values(CONSTS.CLIENT.STATE.TYPE),
        defaultValue: CONSTS.CLIENT.STATE.TYPE.FAILED
    },
    text: {
        type: String,
        defaultValue: "Idle",
        min: 1,
        max: 255
    }
});

var stories = new SimpleSchema({
    running: {
        type: Number,
        min: 0,
        defaultValue: 0
    },
    executed: {
        type: Number,
        min: 0,
        defaultValue: 0
    }
});

var schema = new SimpleSchema({
    address: {
        type: String
    },
    state: {
        type: state
    },
    stories: {
        type: stories
    },
    createdAt: {
        type: Date,
        autoValue: function (doc) {
            if (this.isInsert)
                return new Date();
        }
    }
});

Collections.Clients.attachSchema(schema);
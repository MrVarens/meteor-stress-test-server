var schema = new SimpleSchema({
    isRunning: {
        type: Boolean,
        defaultValue: false
    },
    startEnabledAt: {
        type: Date,
        defaultValue: new Date(0)
    }
});

Collections.Control.attachSchema(schema);
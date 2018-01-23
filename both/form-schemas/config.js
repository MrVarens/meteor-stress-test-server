var server = new SimpleSchema({
    host: {
        type: String
    },
    ssl: {
        type: Boolean
    }
});

var delay = new SimpleSchema({
    from: {
        type: Number,
        min: 1
    },
    to: {
        type: Number,
        min: 2,
        optional: true
    }
});

FormSchemas.Config = new SimpleSchema({
    server: {
        type: server
    },
    threadsPerClient: {
        type: Number,
        min: 1,
        max: 1000
    },
    sendTestUsers: {
        type: Boolean
    },
    delay: {
        type: delay,
        label: "Delay (ms)"
    },
    script: {
        type: String,
        optional: true,
        autoform: {
            type: "textarea"
        }
    }
}, { tracker: Tracker });
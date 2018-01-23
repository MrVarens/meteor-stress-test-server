var server = new SimpleSchema({
    host: {
        type: String,
        defaultValue: "localhost:3000"
    },
    ssl: {
        type: Boolean,
        defaultValue: false
    }
});

var delay = new SimpleSchema({
    from: {
        type: Number,
        min: 1,
        defaultValue: 10
    },
    to: {
        type: Number,
        min: 2,
        optional: true
    }
});

var schema = new SimpleSchema({
    server: {
        type: server
    },
    threadsPerClient: {
        type: Number,
        min: 1,
        max: 1000,
        defaultValue: 30
    },
    sendTestUsers: {
        type: Boolean,
        defaultValue: false
    },
    delay: {
        type: delay
    },
    script: {
        type: String,
        optional: true,
        defaultValue: `namespace Meteor.StressTest
{
    public class Story : StoryBase
    {
        protected override void Handle()
        {
            Logs.Info("Story example");
        }
    }
}`
    }
});

Collections.Config.attachSchema(schema);
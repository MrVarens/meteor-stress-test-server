var schema = new SimpleSchema({
    login: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    reservedBy: {
        type: String,
        optional: true
    }
});

Collections.TestUsers.attachSchema(schema);
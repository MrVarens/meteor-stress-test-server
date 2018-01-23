FormSchemas.Login = new SimpleSchema({
    username: {
        type: String
    },
    password: {
        type: String,
        autoform: {
            afFieldInput: {
                type: "password"
            }
        }
    }
}, { tracker: Tracker });
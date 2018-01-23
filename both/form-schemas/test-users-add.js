FormSchemas.TestUsers.Add = new SimpleSchema({
    data: {
        type: String,
        optional: true,
        autoform: {
            type: "textarea",
            placeholder: "login|password\nlogin|password\nlogin|password\n..."
        }
    }
}, { tracker: Tracker });
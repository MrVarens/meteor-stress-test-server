Meteor.startup(function () {
    Accounts.config({
        // Disallow user creation from client
        forbidClientAccountCreation: true
    });

    Collections.Control.update({}, { $set: { isRunning: false } });
    Collections.Clients.remove({}); // Clean users
    Collections.TestUsers.update({}, { $unset: { reservedBy: "" } }, { multi: true }); // Release all users
});
var ESCAPE_HTML_MAP = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

////////////////////////////////////////////////////////////////////
// Meteor helpers
////////////////////////////////////////////////////////////////////

// Meteor helper for meteor variables like isServer, isClient, user, users, etc...
Template.registerHelper("$Meteor", function() {
    return Meteor;
});

// Get given user data by user id
Template.registerHelper("$MeteorUser", function(userId, variable) {
    let data;
    if (userId == undefined)
        data = Meteor.user();
    else
        data = Meteor.users.findOne(userId);

    if (data == undefined)
        return undefined;

    let variables = variable.split('.');
    variables.forEach(v => data = data[v]);

    return data;
});

////////////////////////////////////////////////////////////////////
// Basic compare helpers
////////////////////////////////////////////////////////////////////

Template.registerHelper("$eq", function(value1, value2) {
    return value1 === value2;
});

Template.registerHelper("$neq", function(value1, value2) {
    return value1 !== value2;
});

Template.registerHelper("$lt", function(value1, value2) {
    return value1 < value2;
});

Template.registerHelper("$lte", function(value1, value2) {
    return value1 <= value2;
});

Template.registerHelper("$gt", function(value1, value2) {
    return value1 > value2;
});

Template.registerHelper("$gte", function(value1, value2) {
    return value1 >= value2;
});

Template.registerHelper("$and", function(value1, value2) {
    return value1 & value2;
});

Template.registerHelper("$or", function(value1, value2) {
    return value1 | value2;
});

Template.registerHelper("$not", function(value) {
    return !value;
});

Template.registerHelper("$exists", function(value) {
    return value !== undefined;
});

Template.registerHelper("$notexists", function(value) {
    return value === undefined;
});

Template.registerHelper("$escapeHtml", function(value) {
    return value.replace(/[&<>"'`=\/]/g, function (s) {
        return ESCAPE_HTML_MAP[s];
    });
});

Template.registerHelper("$dateFormat", function(date, format) {
    return moment(date).format(format);
});

////////////////////////////////////////////////////////////////////
// Project global helpers
////////////////////////////////////////////////////////////////////

Template.registerHelper("$Globals", function() {
    return Globals;
});

Template.registerHelper("$Collections", function() {
    return Collections;
});

Template.registerHelper("$FormSchemas", function() {
    return FormSchemas;
});

Template.registerHelper("$TabularTables", function() {
    return TabularTables;
});
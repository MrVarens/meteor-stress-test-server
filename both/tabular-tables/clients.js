import Tabular from "meteor/aldeed:tabular";

TabularTables.Clients = new Tabular.Table({
    name: "clients",
    collection: Collections.Clients,
    columns: [
        { data: "_id", title: "ID" },
        { data: "address", title: "IP Address" },
        {
            data: "state.type",
            title: "State",
            tmpl: Meteor.isClient && Template.Common_TabularCell_State,
            tmplContext (rowData) {
                return { type: rowData.state.type, text: rowData.state.text };
            }
        },
        { data: "stories.running", title: "Running" },
        { data: "stories.executed", title: "Executed" }
    ],
    responsive: true,
    autoWidth: false
});
import Tabular from "meteor/aldeed:tabular";

TabularTables.TestUsers = new Tabular.Table({
    name: "testUsers",
    collection: Collections.TestUsers,
    columns: [
        { data: "login", title: "Login" },
        { data: "password", title: "Password" },
        {
            data: "reservedBy",
            title: "Is reserved",
            tmpl: Meteor.isClient && Template.Common_TabularCell_Tick,
            tmplContext (rowData) {
                return { value: !!rowData.reservedBy };
            }
        }
    ],
    responsive: true,
    autoWidth: false,
    order: [[2, "desc"]]
});
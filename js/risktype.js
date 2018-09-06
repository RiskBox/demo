var riskType = {

    localData: [],

    showUI: function() {
        riskType.localData = [];

        $$('breadcrumb').setValue('RiskBox - Risk Types');

        RiskBoxPDB.get('risktypes').then(function(doc) {
            // handle doc
            riskType.localData = [];
            doc.risktypes.forEach(element => {
                riskType.localData.push({risktype: element})
            });
            $$("risktypedt").clearAll();
            $$("risktypedt").parse(riskType.localData);
            $$("risktypedt").refresh();
            $$("risktype").show();
        }).catch(function(err) {
            console.log(err);
        });

    },

    ui: {
        id: "risktype",
        autoConfig: true,
        cols: [{
            id:'risktypedt',
            view: "datatable",
            columns: [{
                id: "risktype",
                header: ["Risk Types", { content: "textFilter" }],
                fillspace: true
            }]
        }]
    }

};
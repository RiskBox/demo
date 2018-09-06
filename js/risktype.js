var riskType = {

    localData: [],

    showUI: function() {
        riskType.localData = [];

        $$('breadcrumb').setValue('RiskBox - Risk Types');

        RiskBoxPDB.get('risktypes').then(function(doc) {
            // handle doc
            riskType.localData = [];
            doc.risktypes.forEach(element => {
                riskType.localData.push(element)
            });
            $$("risktypes").clearAll();
            $$("risktypes").parse(riskType.localData);
            $$("risktypes").refresh();
            $$("risktypes").show();
        }).catch(function(err) {
            console.log(err);
        });

    },

    ui: {
        id: "risktype",
        autoConfig: true,
        cols: [{
            view: "datatable",
            columns: [{
                id: "risktypes",
                header: ["Risk Types", {
                    content: "textFilter"
                }]
            }]
        }]
    }

};
var vbw = {

    localData: [],

    showUI: function() {
        vbw.localData = [];

        $$('breadcrumb').setValue('RiskBox - Value Bands Weighting');

        RiskBoxPDB.get('vbw').then(function(doc) {
            // handle doc
            vbw.localData = doc.vbw;
            $$("vbwdt").clearAll();
            $$("vbwdt").parse(vbw.localData);
            $$("vbwdt").refresh();
            $$("vbw").show();
        }).catch(function(err) {
            console.log(err);
        });

    },

    ui: {
        id: "vbw",
        autoConfig: true,
        cols: [{
            id:'vbwdt',
            view: "datatable",
            columns: [
                { id: "band",  header: "Band", css:{'text-align':'right'} },
                { id: "lowerLimit",  header: "Lower Limit", adjust:"data", css:{'text-align':'right'}  },
                { id: "upperLimit",  header: "Upper Limit", adjust:"data", css:{'text-align':'right'}  },
                { id: "vbw",  header: "VBW", css:{'text-align':'right'} },
                { id: "riskRange",  header: "Change in Risk", fillspace:true }
            ]
        }]
    }

};
var ir = {
    localData: [],

    showUI: function() {
        riskType.localData = [];

        $$('breadcrumb').setValue('RiskBox - Inherent Risk');

        $$("ir").show();
    },

    ui: {
        id: "ir",
        cols: [{ template: "TODO!" }]
    }
};
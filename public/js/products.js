var products = {

    localData: [],

    showUI: function() {
        products.localData = [];

        $$('breadcrumb').setValue('RiskBox - Products');

        RiskBoxPDB.get('products').then(function(doc) {
            // handle doc
            products.localData = [];
            doc.products.forEach(element => {
                products.localData.push({product: element})
            });
            $$("productdt").clearAll();
            $$("productdt").parse(products.localData);
            $$("productdt").refresh();
            $$("product").show();
        }).catch(function(err) {
            console.log(err);
        });

    },

    ui: {
        id: "product",
        //autoConfig: true,
        cols: [{
            id:'productdt',
            view: "datatable",
            columns: [{
                id: "product",
                header: ["Products", { content: "textFilter"}],
                fillspace: true
            }]
        }]
    }

};
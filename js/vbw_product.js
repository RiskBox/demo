var vbw_product = {

    localData: [],

    showUI: function() {
        vbw_product.localData = [];

        $$('breadcrumb').setValue('RiskBox - VBW/Product');

        RiskBoxPDB.get('vbw_product').then(function(doc) {
            // handle doc
            vbw_product.localData = doc.data;
            $$("vbw_productdt").clearAll();
            $$("vbw_productdt").parse(vbw_product.localData);
            $$("vbw_productdt").refresh();
            $$("vbw_product").show();
        }).catch(function(err) {
            console.log(err);
        });

    },

    ui: {
        id: "vbw_product",
        cols: [{
            id: 'vbw_productdt',
            //autoConfig: true,
            editable: true,
            view: "datatable",
            columns: [
                { id: "product", header: "Product", adjust: "data" },
                { id: "vbw", header: "VBW" },
                {
                    id: "vbw_band",
                    header: "Select VBW US$",
                    adjust: "data",
                    css: { 'text-align': 'right' },
                    editor: "select",
                    options: [
                        { id: 1, value: "              0 -          62,500, vbw:   2.0", vbw: 2.0 },
                        { id: 2, value: "         62,500 -         125,000, vbw:   2.6", vbw: 2.6 },
                        { id: 3, value: "        125,000 -         250,000, vbw:   3.4", vbw: 3.4 },
                        { id: 4, value: "        250,000 -         500,000, vbw:   4.3", vbw: 4.3 },
                        { id: 5, value: "        500,000 -       1,000,000, vbw:   5.5", vbw: 5.5 },
                        { id: 6, value: "      1,000,000 -       2,000,000, vbw:   7.1", vbw: 7.1 },
                        { id: 7, value: "      2,000,000 -       4,000,000, vbw:   8.9", vbw: 8.9 },
                        { id: 8, value: "      4,000,000 -       8,000,000, vbw:  11.3", vbw: 11.3 },
                        { id: 9, value: "      8,000,000 -      16,000,000, vbw:  14.1", vbw: 14.1 },
                        { id: 10, value: "    16,000,000 -      32,000,000, vbw:  17.6", vbw: 17.6 },
                        { id: 11, value: "    32,000,000 -      64,000,000, vbw:  21.9", vbw: 21.9 },
                        { id: 12, value: "    64,000,000 -     128,000,000, vbw:  27.0", vbw: 27.0 },
                        { id: 13, value: "   128,000,000 -     256,000,000, vbw:  33.1", vbw: 33.1 },
                        { id: 14, value: "   256,000,000 -     512,000,000, vbw:  40.4", vbw: 40.4 },
                        { id: 15, value: "   512,000,000 -   1,024,000,000, vbw:  49.1", vbw: 49.1 },
                        { id: 16, value: " 1,024,000,000 -   2,048,000,000, vbw:  59.3", vbw: 59.3 },
                        { id: 17, value: " 2,048,000,000 -   4,096,000,000, vbw:  71.2", vbw: 71.2 },
                        { id: 18, value: " 4,096,000,000 -   8,192,000,000, vbw:  85.0", vbw: 85.0 },
                        { id: 19, value: " 8,192,000,000 -  16,384,000,000, vbw: 101.0", vbw: 101.0 },
                        { id: 20, value: "16,384,000,000 -  32,768,000,000, vbw: 119.3", vbw: 119.3 },
                        { id: 21, value: "32,768,000,000 -  65,536,000,000, vbw: 140.1", vbw: 140.1 },
                        { id: 22, value: "65,536,000,000 - 131,072,000,000, vbw: 163.6", vbw: 163.6 }
                    ],
                    fillspace: true
                }
            ],
            on: {
                onAfterEditStop(state, editor, ignoreUpdate) {
                    var config = editor.config;
                    var vbw = -1;
                    if (config.id == "vbw_band" && state.value.length > 0) {
                        vbw = config.collection.getItem(state.value).vbw;
                        var obj = this.getItem(editor.row);
                        obj.vbw = vbw;
                        this.updateItem(obj.id);
                    }
                    if (state.value != state.old) {
                        var tableData = [];
                        $$("vbw_productdt").serialize().forEach(element => {
                            tableData.push({ product: element.product, vbw: element.vbw, vbw_band: element.vbw_band });
                        });
                        //console.log(tableData);
                        RiskBoxPDB.get('vbw_product').then(function(doc) {
                            return RiskBoxPDB.put({
                                _id: 'vbw_product',
                                _rev: doc._rev,
                                data: tableData
                            });
                        }).then(function(response) {
                            // handle response
                            webix.message("VBW per Product values updated!");
                        }).catch(function(err) {
                            console.log(err);
                        });
                    }
                }
            }
        }]
    }

};
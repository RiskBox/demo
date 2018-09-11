var euf = {

    localData: [],

    showUI: function() {
        euf.localData = [];

        $$('breadcrumb').setValue('RiskBox - EUF values');

        RiskBoxPDB.get('euf').then(function(doc) {
            // handle doc
            euf.localData = doc.data;
            $$("eufdt").clearAll();
            $$("eufdt").parse(euf.localData);
            $$("eufdt").refresh();
            $$("euf").show();
        }).catch(function(err) {
            console.log(err);
        });

    },

    ui: {
        id: "euf",
        cols: [{
            id: "eufdt",
            view: "datatable",
            columns: [
                { id: "risktypelabel", header: "Risk Matrix" },
                { id: "fxf", header: "FX Forwards", template: "#fxf# {common.editIcon()}" },
                { id: "cls", header: "Commercial Loans (Secured)", template: "#cls# {common.editIcon()}" },
                { id: "ftd", header: "Fixed Term Deposits", template: "#ftd# {common.editIcon()}" },
                { id: "rep", header: "Repos", template: "#rep# {common.editIcon()}" },
                { id: "ccs", header: "Cross Currency Swaps", template: "#ccs# {common.editIcon()}" },
                { id: "fut", header: "Futures", template: "#fut# {common.editIcon()}" },
                { id: "cdo", header: "CDOs", template: "#cdo# {common.editIcon()}" },
                { id: "equ", header: "Equities", template: "#equ# {common.editIcon()}" },
                { id: "fxi", header: "Fixed Income", template: "#fxi# {common.editIcon()}" },
                { id: "pos", header: "Payment Orders", template: "#pos# {common.editIcon()}" }
            ],
            on: {
                "onItemClick": function(id, e, trg) {
                    var obj = this.getItem(id.row);
                    webix.message("Click on row: " + id.row + ", column: " + id.column);
                    //For each pair risk type <-> product show the corresponding form
                    //the form is specifit to each risk type

                    switch (id.row) {
                        case "prc":
                            euf.showFormPRC(id.column);
                            break;

                        default:
                            break;
                    }
                }
            }
        }]
    },

    showFormPRC: function(productID) {

        var prcForm = {
            id: "prcF",
            view: "form",
            width: 600,
            rows: [{
                    cols: [{
                        view: "text",
                        name: "euf",
                        label: "Risk Type: Processing - Product: " + productData[productID] + " - EUF",
                        labelWidth: 500,
                        value: 0
                    }]
                },
                //{ view: "forminput", name: "prcDetails", body: prcFormDT, labelWidth: 0 },
                {
                    view: "formtable",
                    height: 453,
                    columns: [{
                            id: "businesscomponent",
                            header: "Business Component",
                            adjust: "data",
                            fillspace: 1
                        },
                        {
                            id: "selected",
                            header: "Selected",
                            template: "{common.checkbox()}"
                        }
                    ],
                    data: [{
                            id: "psp",
                            businesscomponent: "Product & Service Pricing",
                            selected: 0
                        },
                        {
                            id: "dls",
                            businesscomponent: "Deal Structuring",
                            selected: 0
                        },
                        {
                            id: "orm",
                            businesscomponent: "Order Management",
                            selected: 0
                        },
                        {
                            id: "ptv",
                            businesscomponent: "Pre-Trade Validation",
                            selected: 0
                        },
                        {
                            id: "qpm",
                            businesscomponent: "Quote/Price Management",
                            selected: 0
                        },
                        {
                            id: "tec",
                            businesscomponent: "Trade Execution & Capture",
                            selected: 0
                        },
                        {
                            id: "csh",
                            businesscomponent: "Cash Management",
                            selected: 0
                        },
                        {
                            id: "tcm",
                            businesscomponent: "Trade Confirmation & Matching",
                            selected: 0
                        },
                        {
                            id: "pca",
                            businesscomponent: "Position Control & Amendments",
                            selected: 0
                        },
                        {
                            id: "trr",
                            businesscomponent: "Transaction Reporting",
                            selected: 0
                        },
                        {
                            id: "clm",
                            businesscomponent: "Credit Limit Monitoring",
                            selected: 0
                        },
                        {
                            id: "tlm",
                            businesscomponent: "Trading Limit Monitoring",
                            selected: 0
                        },
                        {
                            id: "trs",
                            businesscomponent: "Trade Settlements",
                            selected: 0
                        },
                        {
                            id: "ccm",
                            businesscomponent: "Custody/Collateral Management",
                            selected: 0
                        },
                        {
                            id: "lop",
                            businesscomponent: "Loans Processing",
                            selected: 0
                        },
                        {
                            id: "pay",
                            businesscomponent: "Payments",
                            selected: 0
                        },
                        {
                            id: "nor",
                            businesscomponent: "Nostro Reconcilement",
                            selected: 0
                        },
                        {
                            id: "tar",
                            businesscomponent: "Trading Account Reconciliations",
                            selected: 0
                        },
                        {
                            id: "glp",
                            businesscomponent: "G/L Proofs & Substantiation",
                            selected: 0
                        },
                        {
                            id: "mgr",
                            businesscomponent: "Management Reporting",
                            selected: 0
                        },
                        {
                            id: "rer",
                            businesscomponent: "Regulatory & External Reporting",
                            selected: 0
                        }
                    ],
                    on: {
                        onCheck: function(rowId, colId, state) {
                            $$("prcF").setValues({
                                euf: (state) ?
                                    parseInt($$("prcF").getValues().euf) + 1 : parseInt($$("prcF").getValues().euf) - 1
                            });
                        }
                    },
                    name: "prcDetails"
                },
                {
                    view: "button",
                    label: "SAVE",
                    type: "form",
                    click: function() {

                        RiskBoxPDB.get('prc_'+productID).then(function(doc) {
                            return RiskBoxPDB.put({
                              _id: 'prc_'+productID,
                              _rev: doc._rev,
                              doctype: "euf",
                              details: $$("prcF").getValues()
                            });
                          }).then(function(response) {
                            // handle response
                          }).catch(function (err) {
                            if (err.name === 'not_found') {
                                return RiskBoxPDB.put({
                                    _id: 'prc_'+productID,
                                    doctype: "euf",
                                    details: $$("prcF").getValues()
                                  }); 
                            } else {
                                console.log(err); // some error other than 404
                            }
                          });
                        
                        var item = $$("eufdt").getItem("prc");
                        item[productID] = parseInt($$("prcF").getValues().euf);
                        $$("eufdt").updateItem("prc", item);

                        RiskBoxPDB.get('euf').then(function(doc) {
                            return RiskBoxPDB.put({
                              _id: 'euf',
                              _rev: doc._rev,
                              doctype: "calculation",
                              data: $$('eufdt').serialize()
                            });
                          }).then(function(response) {
                            // handle response
                          }).catch(function (err) {
                            if (err.name === 'not_found') {
                                return RiskBoxPDB.put({
                                    _id: 'eufdt',
                                    doctype: 'calculation',
                                    data: $$("eufdt").serialize()
                                  }); 
                            } else {
                                console.log(err); // some error other than 404
                            }
                          }); 


                        $$("prcF").hide();
                    }
                }
            ]
        };

        webix.ui({
            view: "window",
            id: "prcW",
            width: 600,
            position: "top",
            head: "EUF Processing - " + productData[productID],
            body: webix.copy(prcForm)
        }).show();

        RiskBoxPDB.get('prc_'+productID).then(function(doc) {
            $$("prcF").setValues(doc.details);
          }).catch(function (err) {
            if (err.name === 'not_found') {
                return RiskBoxPDB.put({
                    _id: 'prc_'+productID,
                    doctype: "euf",
                    details: $$("prcF").getValues()
                  }); 
            } else {
                console.log(err); // some error other than 404
            }
          });
    }

};
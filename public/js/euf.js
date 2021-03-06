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
                        case "mkt":
                            euf.showFromMKT(id.column);
                            break;
                        case "crd":
                            euf.showFormCRD(id.column);
                            break;
                        default:
                            break;
                    }
                }
            }
        }]
    },

    showFormCRD: function(productID){
        
        var crdForm = {
            id: 'crdF',
            view: 'form',
            width: 600,
            rows:[
                {
                    cols: [{
                        view: "text",
                        name: "euf",
                        label: "Risk Type: Credit - Product: " + productData[productID] + " - EUF",
                        labelWidth: 500,
                        value: 0
                    }]
                },
                {
                    view: 'select',
                    name: 'crdDetails',
                    label: 'Credit Type - Form of Security / Type of Instrument',
                    labelPosition: 'top',
                    labelWidth: 500,
                    value: 1,
                    options: [
                        {id: 1, value:"N/A - Not Applicable"},
                        { id: 2, value:"Commercial - Casual Overdraft"},
{ id: 3, value:"Commercial - Credit Card"},
{ id: 4, value:"Commercial - Unsecured"},
{ id: 5, value:"Commercial - Cash"},
{ id: 6, value:"Commercial - Cash Like Instruments (Margins, Liquid AAA Collateral)"},
{ id: 7, value:"Commercial - Repurchase Agreements (Repos)"},
{ id: 8, value:"Commercial - Trade Receivables"},
{ id: 9, value:"Commercial - Instruments Subject to Mark-to-Market"},
{ id: 10, value:"Commercial - Autos"},
{ id: 11, value:"Commercial - Inventory"},
{ id: 12, value:"Commercial - Equipment"},
{ id: 13, value:"Commercial - Investments Subject to Mark to Model"},
{ id: 14, value:"Commercial - Personal Guarantee"},
{ id: 15, value:"Commercial - Project Financing"},
{ id: 16, value:"Commercial - Commercial Real Estate"},
{ id: 17, value:"Counterparty - FX Forwards"},
{ id: 18, value:"Counterparty - Interest Rate Swaps"},
{ id: 19, value:"Counterparty - Cross Currency Swaps"},
{ id: 20, value:"Counterparty - Security Based Swaps"},
{ id: 21, value:"Counterparty - Options"},
{ id: 22, value:"Counterparty - Credit Default Swap"},
{ id: 23, value:"Counterparty - Collateralized Debt Obligations (CDO) and Asset Backed Securities (ABS)"},
{ id: 24, value:"Retail - Casual Overdraft"},
{ id: 25, value:"Retail - Credit Card"},
{ id: 26, value:"Retail - Unsecured"},
{ id: 27, value:"Retail - Autos"},
{ id: 28, value:"Retail - Personal Guarantee"},
{ id: 29, value:"Retail - Residential Property"}
                    ],
                    on:{
                        onChange: function(newv, oldv){
                            $$("crdF").setValues({
                                euf: euf_credit[parseInt($$("crdF").getValues().crdDetails)-1],                                
                                crdDetails: newv
                            });
                        }
                    }
                },
                {
                    view: "button",
                    label: "SAVE",
                    type: "form",
                    click: function() {

                        RiskBoxPDB.get('crd_'+productID).then(function(doc) {
                            return RiskBoxPDB.put({
                              _id: 'crd_'+productID,
                              _rev: doc._rev,
                              doctype: "euf",
                              details: $$("crdF").getValues()
                            });
                          }).then(function(response) {
                            // handle response
                          }).catch(function (err) {
                            if (err.name === 'not_found') {
                                return RiskBoxPDB.put({
                                    _id: 'crd_'+productID,
                                    doctype: "euf",
                                    details: $$("crdF").getValues()
                                  }); 
                            } else {
                                console.log(err); // some error other than 404
                            }
                          });
                        
                        var item = $$("eufdt").getItem("crd");
                        item[productID] = parseInt($$("crdF").getValues().euf);
                        $$("eufdt").updateItem("crd", item);

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


                        $$("crdF").hide();
                    }
                }
            ]
        };

        webix.ui({
            view: "window",
            id: "crdW",
            width: 600,
            position: "top",
            head: "EUF Credit - " + productData[productID],
            body: webix.copy(crdForm)
        }).show();

        RiskBoxPDB.get('crd_'+productID).then(function(doc) {
            $$("crdF").setValues(doc.details);
          }).catch(function (err) {
            if (err.name === 'not_found') {
                return RiskBoxPDB.put({
                    _id: 'crd_'+productID,
                    doctype: "euf",
                    details: $$("crdF").getValues()
                  }); 
            } else {
                console.log(err); // some error other than 404
            }
          });        
    },

    showFromMKT: function(productID){

        var mktForm = {
            id: "mktF",
            view: "form",
            width: 600,
            rows:[
                {
                    cols: [{
                        view: "text",
                        name: "euf",
                        label: "Risk Type: Market - Product: " + productData[productID] + " - EUF",
                        labelWidth: 500,
                        value: 0
                    }]
                },
                {
                    view: "select",
                    name: 'mktAvailability',
                    label: 'Availability and reliability of market prices:',
                    labelPosition: 'top',
                    labelWidth: 500,
                    value: 1,
                    options:[
                        {id: 1, value:"N/A - Not Applicable"},
                        {id: 2, value:"Active market prices"},
                        {id: 3, value:"Inactive but observable market prices"},
                        {id: 4, value:"Unobservable prices that need judgment"},
                        {id: 5, value:"No prices but economic or other assumptions (demographic, holistic etc.) are required"}
                    ],
                    on:{
                        onChange: function(newv, oldv){
                            $$("mktF").setValues({
                                euf: euf_market_trading[parseInt($$("mktF").getValues().mktTrading)-1] + euf_market_availability[parseInt($$("mktF").getValues().mktAvailability)-1],
                                mktTrading: $$("mktF").getValues().mktTrading,
                                mktAvailability: newv
                            });
                        }
                    }
                },
                {
                    view: 'select',
                    name: 'mktTrading',
                    label: 'The manner in which the product is traded',
                    labelPosition: 'top',
                    labelWidth: 500,
                    value: 1,
                    options:[
                        {id: 1, value:"N/A - Not Applicable", euf:0},
                        {id: 2, value:"Electronic", euf: 2},
                        {id: 3, value:"Hybrid (electronic + floor / voice-based)", euf: 4},
                        {id: 4, value:"Floor / voice-based", euf: 6},
                        {id: 5, value:"Over-The-Counter (OTC)", euf: 10},
                        {id: 6, value:"Other", euf: 10}
                    ],
                    on:{
                        onChange: function(newv, oldv){
                            $$("mktF").setValues({
                                euf: euf_market_trading[parseInt($$("mktF").getValues().mktTrading)-1] + euf_market_availability[parseInt($$("mktF").getValues().mktAvailability)-1],
                                mktTrading: newv,
                                mktAvailability:  $$("mktF").getValues().mktAvailability
                            });
                        }
                    }
                },
                {
                    view: "button",
                    label: "SAVE",
                    type: "form",
                    click: function() {

                        RiskBoxPDB.get('mkt_'+productID).then(function(doc) {
                            return RiskBoxPDB.put({
                              _id: 'mkt_'+productID,
                              _rev: doc._rev,
                              doctype: "euf",
                              details: $$("mktF").getValues()
                            });
                          }).then(function(response) {
                            // handle response
                          }).catch(function (err) {
                            if (err.name === 'not_found') {
                                return RiskBoxPDB.put({
                                    _id: 'mkt_'+productID,
                                    doctype: "euf",
                                    details: $$("mktF").getValues()
                                  }); 
                            } else {
                                console.log(err); // some error other than 404
                            }
                          });
                        
                        var item = $$("eufdt").getItem("mkt");
                        item[productID] = parseInt($$("mktF").getValues().euf);
                        $$("eufdt").updateItem("mkt", item);

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


                        $$("mktF").hide();
                    }
                }
            ]
        };

        webix.ui({
            view: "window",
            id: "mktW",
            width: 600,
            position: "top",
            head: "EUF Market - " + productData[productID],
            body: webix.copy(mktForm)
        }).show();

        RiskBoxPDB.get('mkt_'+productID).then(function(doc) {
            $$("mktF").setValues(doc.details);
          }).catch(function (err) {
            if (err.name === 'not_found') {
                return RiskBoxPDB.put({
                    _id: 'mkt_'+productID,
                    doctype: "euf",
                    details: $$("mktF").getValues()
                  }); 
            } else {
                console.log(err); // some error other than 404
            }
          });

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
                    data: [
                        {
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
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
        var prcFormDT = {
            view: "datatable",
            id: "prcFdt",
            height: 453,
            columns: [
                { id: "businesscomponent", header: "Business Component", adjust: "data", fillspace: 1 },
                { id: "selected", header: "Selected", template: "{common.checkbox()}" }
            ],
            data: [
                { id: "psp", businesscomponent: "Product & Service Pricing", selected: 0 },
                { id: "dls", businesscomponent: "Deal Structuring", selected: 0 },
                { id: "orm", businesscomponent: "Order Management", selected: 0 },
                { id: "ptv", businesscomponent: "Pre-Trade Validation", selected: 0 },
                { id: "qpm", businesscomponent: "Quote/Price Management", selected: 0 },
                { id: "tec", businesscomponent: "Trade Execution & Capture", selected: 0 },
                { id: "csh", businesscomponent: "Cash Management", selected: 0 },
                { id: "tcm", businesscomponent: "Trade Confirmation & Matching", selected: 0 },
                { id: "pca", businesscomponent: "Position Control & Amendments", selected: 0 },
                { id: "trr", businesscomponent: "Transaction Reporting", selected: 0 },
                { id: "clm", businesscomponent: "Credit Limit Monitoring", selected: 0 },
                { id: "tlm", businesscomponent: "Trading Limit Monitoring", selected: 0 },
                { id: "trs", businesscomponent: "Trade Settlements", selected: 0 },
                { id: "ccm", businesscomponent: "Custody/Collateral Management", selected: 0 },
                { id: "lop", businesscomponent: "Loans Processing", selected: 0 },
                { id: "pay", businesscomponent: "Payments", selected: 0 },
                { id: "nor", businesscomponent: "Nostro Reconcilement", selected: 0 },
                { id: "tar", businesscomponent: "Trading Account Reconciliations", selected: 0 },
                { id: "glp", businesscomponent: "G/L Proofs & Substantiation", selected: 0 },
                { id: "mgr", businesscomponent: "Management Reporting", selected: 0 },
                { id: "rer", businesscomponent: "Regulatory & External Reporting", selected: 0 }
            ]
        };

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
                { view: "forminput", body: prcFormDT, labelWidth: 0 },
                {
                    view: "button",
                    label: "SAVE",
                    type: "form",
                    click: function() {
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
    }

};
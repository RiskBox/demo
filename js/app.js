//Main layout of the application
var myApp = {

    init: function() {
        myApp.showUI();

    },

    showUI: function() {
        if (!webix.isUndefined($$('mainLayout'))) $$('mainLayout').destructor();
        webix.ui(webix.copy(myApp.ui));
        riskType.showUI();

    },

    ui: {
        id: "mainLayout",
        view: "layout",
        rows: [{
                view: "toolbar",
                id: "toolbar",
                elements: [{
                        view: "button",
                        type: "icon",
                        icon: "bars",
                        width: 37,
                        align: "left",
                        css: "app_button",
                        click: function() {
                            $$("menu").toggle();
                        }
                    },
                    { view: "label", id: "breadcrumb", label: "RiskBox" }
                ]
            },
            {
                cols: [{
                        view: "sidebar",
                        id: "menu",
                        //collapsed: true,
                        collapsedWidth: 43,
                        //activeTitle: false,
                        //titleHeight: 60,

                        //width: 300,

                        data: [{
                                id: 1,
                                value: "Setup",
                                icon: "cogs",
                                data: [
                                    { id: "risktypes", value: "Risk Types" },
                                    { id: "products", value: "Products" },
                                    { id: "vbw", value: "VBW" },
                                    { id: "import", value: "Import data" },
                                    { id: "export", value: "Export data" },
                                    { id: "reset", value: "Load defaults" }
                                ]
                            },
                            {
                                id: 2,
                                value: "Calculations",
                                icon: "calculator",
                                data: [
                                    { id: "vbw_product", value: "VBW per Product" },
                                    { id: "euf", value: "Risk Matrix EUF" }
                                ]
                            },
                            {
                                id: 3,
                                value: "Dashboard",
                                icon: "tachometer",
                                data: [
                                    { id: "ir", value: "Inherent Risk" }
                                ]
                            }
                        ],
                        on: {
                            onAfterSelect: function(id) {
                                webix.message("Selected: " + id);
                                myApp.loadPage(id);
                            }
                        }

                    },
                    {
                        id: "mainPage",
                        view: "multiview",
                        cells: [
                            riskType.ui,
                            products.ui,
                            vbw.ui,
                            vbw_product.ui,
                            euf.ui,
                            ir.ui
                        ],
                        fitBiggest: true
                    }
                ]
            }
        ]
    },

    loadPage: function(page) {
        switch (page) {
            case "risktypes":
                riskType.showUI();
                break;
            case "products":
                products.showUI();
                break;
            case "vbw":
                vbw.showUI();
                break;
            case "euf":
                euf.showUI();
                break;
            case "vbw_product":
                vbw_product.showUI();
                break;
            case "ir":
                ir.showUI();
                break;
            default:
                break;
        }
    }

};
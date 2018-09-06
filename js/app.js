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
                                    { id: "euf", value: "EUF" },
                                    { id: "vbw", value: "VBW" },
                                    { id: "import", value: "Import data" },
                                    { id: "export", value: "Export data" },
                                    { id: "reset", value: "Load defaults" }
                                ]
                            },
                            {
                                id: 2,
                                value: "Data",
                                icon: "calculator",
                                data: [
                                    { id: "euf_product", value: "Enter EUF" },
                                    { id: "values_product", value: "Enter values" }
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
                                myApp.loadPage(this.getItem(id).value);
                            }
                        }

                    },
                    {
                        id: "mainPage",
                        view: "multiview",
                        cells: [
                            riskType.ui
                        ],
                        fitBiggest: true
                    }
                ]
            }
        ]
    },


    views: [{
        template: "WIP!"
    }],

    loadPage: function(page) {
        switch (page) {
            case "risktypes":

                break;

            default:
                break;
        }
    }

};
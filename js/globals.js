/**
 * 
 * Create new view that extends List and webix.ActiveContent
 * 
 */
webix.protoUI({ name: 'activeList' },
    webix.ui.list,
    webix.ActiveContent);
/**
 * 
 * PouchDB configuration
 * - database name

 * 
 */
var DBNAME = "riskbox_demo";
/**
 * Clean local database and create a brand new one
 */

var RiskBoxPDB = new PouchDB(DBNAME);
//Delete and create a new empty DB
async function setup_db() {
    try {
        let result = await RiskBoxPDB.destroy();
        RiskBoxPDB = new PouchDB(DBNAME);
        result = await populate_data();
    } catch (err) {
        console.log(err);
    }
}
setup_db();

//Populate with sample data

async function populate_data() {

    let docs_data = [{
            _id: "products",
            products: ["FX Forwards", "Commercial Loans (Secured)", "Fixed Term Deposits",
                "Repos", "Cross Currency Swaps", "Futures", "CDOs", "Equities", "Fixed Income",
                "Payment Orders"
            ],
            doctype: "setup"
        },
        {
            _id: "risktypes",
            risktypes: ["Processing", "Market", "Credit", "Conduct", "Liquidity", "Interest Rate"],
            doctype: "setup"
        },
        {
            _id: "euf",
            doctype: "setup"
        },
        {
            _id: "businesscomponenets",
            businesscomponenets: [
                "Product & Service Pricing",
                "Deal Structuring",
                "Order Management",
                "Pre-Trade Validation",
                "Quote/Price Management",
                "Trade Execution & Capture",
                "Cash Management",
                "Trade Confirmation & Matching",
                "Position Control & Amendments",
                "Transaction Reporting",
                "Credit Limit Monitoring",
                "Trading Limit Monitoring",
                "Trade Settlements",
                "Custody/Collateral Management",
                "Loans Processing",
                "Payments",
                "Nostro Reconcilement",
                "Trading Account Reconciliations",
                "G/L Proofs & Substantiation",
                "Management Reporting",
                "Regulatory & External Reporting"
            ],
            doctype: "setup"
        },
        { _id: "vbw", vbw: [], doctype: "setup" }
    ];

    for (let doc of docs_data) {
        try {
            let doc_result = await RiskBoxPDB.get(doc._id);
            let del_result = await RiskBoxPDB.remove(doc_result);
            let create_result = await RiskBoxPDB.put(doc);
        } catch (err) {
            if (err.name === 'not_found') {
                let result = await RiskBoxPDB.put(doc);
            } else {
                console.log(err); // some error other than 404
            }
        }
    }
}

//END OF SAMPLE DATA


/**
 * 
 * Date formatting function
 * 
 */
var myDateFormat = webix.Date.dateToStr("%d.%m.%Y");

/**
 * Proxy for PouchDB Webix style
 */
webix.proxy.PouchDB = {
    $proxy: true,

    load: function(view, callback) {
        //GET JSON Array from database/design_document/_list/[list_name]/[view_name]  
        webix.ajax(this.source, callback, view);
    },


    save: function(view, update, dp, callback) {

            //your saving pattern
            if (update.operation == "update") {
                webix.ajax().header({
                    "Content-type": "application/json"
                }).post(dp.config.url.source + "\/" + update.data._id,
                    JSON.stringify(update.data), [function(text, data, xhr) {
                        //response
                        //console.log(text);
                        console.log(data.json());
                        //console.log(xhr);
                        var msg = data.json();
                        if ('action' in msg) {
                            var item = view.getItem(update.data.id);
                            item._rev = xhr.getResponseHeader('X-Couch-Update-NewRev'); //setting _rev property and value for it
                            view.updateItem(update.data.id, item);
                            view.refresh();
                        }
                    }, callback]
                );
            }

            if (update.operation == "insert") {
                webix.ajax().header({
                    "Content-type": "application/json"
                }).post(dp.config.url.source,
                    JSON.stringify(update.data), [function(text, data, xhr) {
                        //response
                        //console.log(text);
                        console.log(data.json());
                        //console.log(xhr);
                        var msg = data.json();
                        if ('action' in msg) {
                            var item = view.getItem(update.data.id);
                            item._id = xhr.getResponseHeader('X-Couch-Id');
                            item._rev = xhr.getResponseHeader('X-Couch-Update-NewRev'); //setting _rev property and value for it
                            view.updateItem(update.data.id, item);
                            view.refresh();
                        }
                    }, callback]
                );
            }
        }
        /*
        ,

        result: function(state, view, dp, text, data, loader) {
            //your logic of server-side response processing

            console.log(state);
            console.log(view);
            console.log(dp);
            console.log(text);
            console.log(data);
            console.log(loader);

            //dp.processResult(state, data, details);
        }
        */
};
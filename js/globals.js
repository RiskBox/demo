/**
 * 
 * Create new view that extends List and webix.ActiveContent
 * 
 */
webix.protoUI({
        name: 'activeList'
    },
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
productData = {
    fxf: "FX Forwards",
    cls: "Commercial Loans (Secured)",
    ftd: "Fixed Term Deposits",
    rep: "Repos",
    ccs: "Cross Currency Swaps",
    fut: "Futures",
    cdo: "CDOs",
    equ: "Equities",
    fxi: "Fixed Income",
    pos: "Payment Orders"
};

riskTypesData = {
    prc: "Processing",
    mkt: "Market",
    crd: "Credit",
    cnd: "Conduct",
    liq: "Liquidity",
    irt: "Interest Rate"
};


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
            data: [
                { risktypelabel: "Processing", id: "prc", fxf: 0, cls: 0, ftd: 0, rep: 0, ccs: 0, fut: 0, cdo: 0, equ: 0, fxi: 0, pos: 0 },
                { risktypelabel: "Market", id: "mkt", fxf: 0, cls: 0, ftd: 0, rep: 0, ccs: 0, fut: 0, cdo: 0, equ: 0, fxi: 0, pos: 0 },
                { risktypelabel: "Credit", id: "crd", fxf: 0, cls: 0, ftd: 0, rep: 0, ccs: 0, fut: 0, cdo: 0, equ: 0, fxi: 0, pos: 0 },
                { risktypelabel: "Conduct", id: "cnd", fxf: 0, cls: 0, ftd: 0, rep: 0, ccs: 0, fut: 0, cdo: 0, equ: 0, fxi: 0, pos: 0 },
                { risktypelabel: "Liquidity", id: "liq", fxf: 0, cls: 0, ftd: 0, rep: 0, ccs: 0, fut: 0, cdo: 0, equ: 0, fxi: 0, pos: 0 },
                { risktypelabel: "Interest Rate", id: "irt", fxf: 0, cls: 0, ftd: 0, rep: 0, ccs: 0, fut: 0, cdo: 0, equ: 0, fxi: 0, pos: 0 }
            ],
            doctype: "calculation"
        },
        {
            _id: "vbw_product",
            data: [
                { product: "FX Forwards", vbw: 2, vbw_band: "1" },
                { product: "Commercial Loans (Secured)", vbw: 2, vbw_band: "1" },
                { product: "Fixed Term Deposits", vbw: 2, vbw_band: "1" },
                { product: "Repos", vbw: 2, vbw_band: "1" },
                { product: "Cross Currency Swaps", vbw: 2, vbw_band: "1" },
                { product: "Futures", vbw: 2, vbw_band: "1" },
                { product: "CDOs", vbw: 2, vbw_band: "1" },
                { product: "Equities", vbw: 2, vbw_band: "1" },
                { product: "Fixed Income", vbw: 2, vbw_band: "1" },
                { product: "Payment Orders", vbw: 2, vbw_band: "1" }
            ],
            doctype: "calculation"
        },
        {
            _id: "businesscomponents",
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
        {
            _id: "vbw",
            vbw: [{
                    band: 1,
                    lowerLimit: 0,
                    upperLimit: 62500,
                    vbw: 2,
                    riskRange: 20
                },
                {
                    band: 2,
                    lowerLimit: 62500,
                    upperLimit: 125000,
                    vbw: 2.6,
                    riskRange: 11.2
                },
                {
                    band: 3,
                    lowerLimit: 125000,
                    upperLimit: 250000,
                    vbw: 3.4,
                    riskRange: 7.35
                },
                {
                    band: 4,
                    lowerLimit: 250000,
                    upperLimit: 500000,
                    vbw: 4.3,
                    riskRange: 4.8
                },
                {
                    band: 5,
                    lowerLimit: 500000,
                    upperLimit: 1000000,
                    vbw: 5.5,
                    riskRange: 3.11
                },
                {
                    band: 6,
                    lowerLimit: 1000000,
                    upperLimit: 2000000,
                    vbw: 7.1,
                    riskRange: 2.01
                },
                {
                    band: 7,
                    lowerLimit: 2000000,
                    upperLimit: 4000000,
                    vbw: 8.9,
                    riskRange: 1.29
                },
                {
                    band: 8,
                    lowerLimit: 4000000,
                    upperLimit: 8000000,
                    vbw: 11.3,
                    riskRange: 0.83
                },
                {
                    band: 9,
                    lowerLimit: 8000000,
                    upperLimit: 16000000,
                    vbw: 14.1,
                    riskRange: 0.53
                },
                {
                    band: 10,
                    lowerLimit: 16000000,
                    upperLimit: 32000000,
                    vbw: 17.6,
                    riskRange: 0.33
                },
                {
                    band: 11,
                    lowerLimit: 32000000,
                    upperLimit: 64000000,
                    vbw: 21.9,
                    riskRange: 0.21
                },
                {
                    band: 12,
                    lowerLimit: 64000000,
                    upperLimit: 128000000,
                    vbw: 27,
                    riskRange: 0.13
                },
                {
                    band: 13,
                    lowerLimit: 128000000,
                    upperLimit: 256000000,
                    vbw: 33.1,
                    riskRange: 0.08
                },
                {
                    band: 14,
                    lowerLimit: 256000000,
                    upperLimit: 512000000,
                    vbw: 40.4,
                    riskRange: 0.05
                },
                {
                    band: 15,
                    lowerLimit: 512000000,
                    upperLimit: 1024000000,
                    vbw: 49.1,
                    riskRange: 0.03
                },
                {
                    band: 16,
                    lowerLimit: 1024000000,
                    upperLimit: 2048000000,
                    vbw: 59.3,
                    riskRange: 0.02
                },
                {
                    band: 17,
                    lowerLimit: 2048000000,
                    upperLimit: 4096000000,
                    vbw: 71.2,
                    riskRange: 0.01
                },
                {
                    band: 18,
                    lowerLimit: 4096000000,
                    upperLimit: 8192000000,
                    vbw: 85,
                    riskRange: 0.01
                },
                {
                    band: 19,
                    lowerLimit: 8192000000,
                    upperLimit: 16384000000,
                    vbw: 101,
                    riskRange: 0
                },
                {
                    band: 20,
                    lowerLimit: 16384000000,
                    upperLimit: 32768000000,
                    vbw: 119.3,
                    riskRange: 0
                },
                {
                    band: 21,
                    lowerLimit: 32768000000,
                    upperLimit: 65536000000,
                    vbw: 140.1,
                    riskRange: 0
                },
                {
                    band: 22,
                    lowerLimit: 65536000000,
                    upperLimit: 131072000000,
                    vbw: 163.6,
                    riskRange: 0
                }
            ],
            doctype: "setup"
        }
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
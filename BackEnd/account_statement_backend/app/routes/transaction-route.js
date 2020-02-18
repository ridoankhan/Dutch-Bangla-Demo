const TransactionController = require("../controllers/transaction-controller.js");
const Router = require("./router.js");
const consola = require("consola");

class TransactionRouter extends Router {
    constructor() {
        super();
        this.transactionController = new TransactionController();
        this.configureRoutes();
    }

    configureRoutes() {
        this.router.post(
            "/by-date-range",
            this.transactionController.getAccInfoByDateRange,
        );
    }
}

module.exports = TransactionRouter;
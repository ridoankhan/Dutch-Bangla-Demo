const consola = require("consola");
const Router = require("./router.js");

const AccountRoute = require("./account-route.js");
const CustomerRoute = require("./customer-route.js");
const StatementRoute = require("./statement-route.js");
const TransactionRoute = require("./transaction-route.js");
// const AuthenticationRoute = require("./authentication.routes.js");

class RootRouter extends Router {
    constructor() {
        super();

        try {
            this.setSubRoutes();
            this.configureRoutes();
        } catch (error) {
            consola.error(error);
        }
    }

    async setSubRoutes() {
        try {
            this.accountRoute = new AccountRoute();
            this.customerRoute = new CustomerRoute();
            this.statementRoute = new StatementRoute();
            this.transactionRoute = new TransactionRoute();
            //this.authenticationRoute = new AuthenticationRoute();
        } catch (error) {
            consola.error(error);
        }
    }

    async configureRoutes() {
        try {
            this.router.use("/account", this.accountRoute.getRouter());
            this.router.use("/customer", this.customerRoute.getRouter());
            this.router.use("/transaction", this.transactionRoute.getRouter());
            this.router.use("/statement", this.statementRoute.getRouter());
            this.router.use((req, res) => {
                res.status(404).json({
                    msg: "no route found",
                });
            });
        } catch (error) {
            consola.error(error);
        }
    }
}

module.exports = RootRouter;
const consola = require("consola");
const TransactionService = require("../services/transaction-service.js");

class TransactionController {
    constructor() {
        //this.getTransactionByRange = this.getTransactionByRange.bind(this);
    }

    async getTransactionByRange(req, res, next) {
        try {
        } catch (error) {
            consola.error(error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = TransactionController;

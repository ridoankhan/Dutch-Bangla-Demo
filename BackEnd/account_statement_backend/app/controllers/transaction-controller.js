const consola = require("consola");
const TransactionService = require("../services/transaction-service.js");

class TransactionController {
    constructor() {
        this.transactionService = new TransactionService();
    }

    async getAccInfoByDateRange(req, res, next) {
        try {
            const acc_info = await this.transactionService.findAccountInfoByDateRange(
                req.body,
            );
            res.status(201).json(acc_info);
        } catch (error) {
            consola.error(error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = TransactionController;

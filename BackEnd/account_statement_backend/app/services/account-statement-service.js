const consola = require("consola");
const Account = require("../models/account.js");
const Customer = require("../models/customer.js");
const Statement = require("../models/statement.js");
const Transaction = require("../models/transaction.js");

class StatementService {
    constructor() {}

    async createNew(req) {
        try {
            const { startDate, endDate, tx_hash } = req.body;
            const account = await Account.findOne({
                attributes: ["id"],
                where: { customerId: req.body.customerId },
            });

            const accountId = account.id;
            consola.info(accountId);
            const ac_statement = await Statement.build({
                startDate,
                endDate,
                tx_hash,
                accountId,
            }).save();
            return ac_statement;
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }

    async findByTsHash(tx_hash) {
        try {
            let statement = await Statement.findOne({
                where: {
                    tx_hash: tx_hash,
                },
            });

            consola.info(statement);
            return statement;
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }
}

module.exports = StatementService;

const consola = require("consola");
const Account = require("../models/account.js");
const Customer = require("../models/customer.js");
const Statement = require("../models/statement.js");
const Transaction = require("../models/transaction.js");

class StatementService {
    constructor() {}

    async createNew(req) {
        try {
            const {
                startDate,
                endDate,
                tx_hash,
                closing_balance,
                opening_balance,
                debits,
                credits,
                dr_count,
                cr_count,
                uncollected_funds,
            } = req.body;

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
                closing_balance,
                opening_balance,
                debits,
                credits,
                dr_count,
                cr_count,
                uncollected_funds,
                accountId,
            }).save();

            consola.info(ac_statement);
            return ac_statement;
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }

    async findByTsHash(id) {
        try {
            let statement = await Statement.findOne({
                attributes: [
                    "startDate",
                    "endDate",
                    "tx_hash",
                    "closing_balance",
                    "opening_balance",
                    "debits",
                    "credits",
                    "dr_count",
                    "cr_count",
                    "uncollected_funds",
                ],
                where: {
                    id: id,
                },
            });

            consola.info(statement);
            if (!statement) {
                throw new Error("No account statement found.");
            }
            return statement;
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }
}

module.exports = StatementService;

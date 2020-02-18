const consola = require("consola");
const StatementService = require("../services/account-statement-service.js");

class AccountStatement {
    constructor() {
        this.statementService = new StatementService();

        this.createAccountStatement = this.createAccountStatement.bind(this);
        this.getStatementByTxHash = this.getStatementByTxHash.bind(this);
    }

    async createAccountStatement(req, res, next) {
        try {
            consola.info("AccountStatement.createAccountStatement()");
            await this.statementService.createNew(req);
            res.status(201).json({ message: "Account satetment created." });
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }

    async getStatementByTxHash(req, res, next) {
        try {
            const statement = await this.statementService.findByTsHash(
                req.params.tx_hash,
            );
            res.status(201).json(statement);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }

    async getStatementByCustomerNumber(req, res, next) {
        try {
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = AccountStatement;

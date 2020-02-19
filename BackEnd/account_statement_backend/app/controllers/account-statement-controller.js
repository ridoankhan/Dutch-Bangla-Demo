const consola = require("consola");
const StatementService = require("../services/account-statement-service.js");

class AccountStatement {
    constructor() {
        this.statementService = new StatementService();

        this.createAccountStatement = this.createAccountStatement.bind(this);
        this.getStatementByTxId = this.getStatementByTxId.bind(this);
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

    async getStatementByTxId(req, res, next) {
        try {
            const statement = await this.statementService.findByTsHash(
                req.params.id,
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

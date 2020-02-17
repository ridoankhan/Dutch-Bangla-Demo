const consola = require("consola");
const StatementService = require("../services/account-statement-service.js");

class AccountStatement {
    constructor() {
        this.statementService = new StatementService();
    }

    async createAccountStatement(req, res, next) {
        try {
            await this.statementService.createNew;
        } catch (error) {
            console.error(error);
        }
    }

    async getStatementById(req, res, next) {
        try {
        } catch (error) {
            console.error(error);
        }
    }

    async getStatementByCustomerNumber(req, res, next) {
        try {
        } catch (error) {
            console.error(error);
        }
    }

    async getAccountBalanceByDate(accountId) {
        try {
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }
}

module.exports = AccountStatement;

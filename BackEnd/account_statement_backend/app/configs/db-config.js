const consola = require("consola");
const Sequelize = require("sequelize");

const Account = require("../models/account.js");
const Customer = require("../models/customer.js");
const Transaction = require("../models/transaction.js");
const AccountStatement = require("../models/statement.js");

class DbConfigurator {
    constructor() {}

    async configure() {
        try {
            await this.createConnection();
            await this.initModels();
            await this.configureAssociations();
            await this.syncModels();

            consola.info("Database configured successfully.");
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }

    async createConnection() {
        try {
            this.connection = new Sequelize(
                process.env.DATABASE,
                process.env.USER_NAME,
                process.env.PASSWORD,
                {
                    host: process.env.HOST,
                    dialect: process.env.DIALECT,
                    pool: {
                        max: 30,
                        min: 0,
                        acquire: 1000000,
                        idle: 0,
                    },
                },
            );
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }

    async initModels() {
        try {
            Customer.init(this.connection);
            Account.init(this.connection);
            Transaction.init(this.connection);
            AccountStatement.init(this.connection);
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }

    async configureAssociations() {
        try {
            this.belongsToOneAs(Account.model, Customer.model, "customer");
            this.belongsToOneAs(Transaction.model, Account.model, "account");
            this.belongsToOneAs(
                AccountStatement.model,
                Account.model,
                "account",
            );
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }

    async syncModels() {
        try {
            Customer.sync();
            Account.sync();
            Transaction.sync();
            AccountStatement.sync();
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }

    belongsToOneAs(referencing_model, referenced_model, colName) {
        referencing_model.belongsTo(referenced_model, { as: colName });
    }
}

module.exports = DbConfigurator;

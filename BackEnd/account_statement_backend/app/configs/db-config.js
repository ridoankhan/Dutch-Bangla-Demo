const consola = require("consola");
const Sequelize = require("sequelize");

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
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }

    async configureAssociations() {
        try {
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }

    async syncModels() {
        try {
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

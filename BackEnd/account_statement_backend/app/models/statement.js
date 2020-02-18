const Sequelize = require("sequelize");

class Statement extends Sequelize.Model {
    static init(sequelize) {
        this.model = super.init({
            startDate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            endDate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            tx_hash: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            closing_balance: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            opening_balance: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            debits: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            credits: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            dr_count: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            cr_count: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            uncollected_funds: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

        }, {
            sequelize,
            modelName: "Statement",
            tableName: "Statement",
        }, );
    }
}

module.exports = Statement;
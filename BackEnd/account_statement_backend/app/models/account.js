const Sequelize = require("sequelize");

class Account extends Sequelize.Model {
    static init(sequelize) {
        this.model = super.init({
            accountNumber: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            accountBalance: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Account",
            tableName: "Account",
        }, );
    }
}

module.exports = Account;
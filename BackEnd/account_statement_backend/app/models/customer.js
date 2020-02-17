const Sequelize = require("sequelize");

class Customer extends Sequelize.Model {
    static init(sequelize) {
        this.model = super.init(
            {
                customerName: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                address: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Customer",
                tableName: "Customer",
            },
        );
    }
}

module.exports = Customer;

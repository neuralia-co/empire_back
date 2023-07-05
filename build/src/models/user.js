"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: false,
    modelName: "user"
});
exports.default = User;

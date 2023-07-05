
import { sequelize } from "../utils/db";
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";


class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare name: string;
}


User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "user"
});

export default User;
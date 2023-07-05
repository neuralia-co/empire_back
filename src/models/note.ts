import { sequelize } from "../utils/db";
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

class Note extends Model<InferAttributes<Note>, InferCreationAttributes<Note>> {
    declare id: CreationOptional<number>;
    declare content: string;
    declare important: boolean;
    declare date: Date;
}


Note.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    important: {
        type: DataTypes.BOOLEAN
    },
    date: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "note"
});

export default Note;
import { Sequelize } from "sequelize";
import { DATABASE_URL } from "./config";

export const sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("connected to the database");
    } catch (err) {
        console.log("failed to connect to the database");
        return process.exit(1);
    }

    return null;
};

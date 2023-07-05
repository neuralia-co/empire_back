import dotenv from "dotenv";
dotenv.config();

// const SCALINGO_POSTGRESQL_URL = process.env.NODE_ENV === "test"
//     ? process.env.TEST_MONGODB_URI
//     : process.env.SCALINGO_POSTGRESQL_URL;


export const DATABASE_URL = process.env.SCALINGO_POSTGRESQL_URL || "";
export const PORT = process.env.PORT || 3001;

export const SECRET = "secret";
import dotenv from "dotenv";
dotenv.config();

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

export const DATABASE_URI = process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"
    ? process.env.LOCAL_URI || ""
    : process.env.SCALINGO_POSTGRESQL_URI || "";

export const SSL_ON:boolean = process.env.DB_ENABLE_SSL === "true";

export const PORT = process.env.PORT || 3001;

export const SECRET:string = process.env.SECRET || "";

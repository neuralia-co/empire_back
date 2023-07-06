import { User } from "../models";
import { InferAttributes } from "sequelize";

const usersInDb = async () => {
    console.log(2);
    const users = await User.findAll();

    const mapped: InferAttributes<User>[] = users.map(u => u.toJSON());
    console.log(mapped);
    return mapped;
};


export default {
    usersInDb
};
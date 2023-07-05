import { Note, User } from "../models";

const usersInDb = async () => {
    const users = await User.findAll({
        include: {
            model: Note,
            attributes: { exclude: ["userId"] }
        }
    });

    return users.map(u => u.toJSON());
};


export default {
    usersInDb
};
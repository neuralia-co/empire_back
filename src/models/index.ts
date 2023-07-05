import Note from "./note";
import User from "./user";

User.hasMany(Note);
Note.belongsTo(User);
void Note.sync({ alter: true });
void User.sync({ alter: true });

export {
    Note, User
};
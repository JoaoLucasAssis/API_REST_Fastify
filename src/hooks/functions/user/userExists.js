import { ALREADY_EXISTS } from "../../../libs/error.js"

export const UserExists = (app) => async (req, rep) => {
    const users = app.mongo.db.collection('users');

    let user = req.body;

    let result = await users.count({ style: user.style });

    if (result > 0) throw new ALREADY_EXISTS();
}
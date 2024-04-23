import { ALREADY_EXISTS } from "../../../libs/error.js"

export const checkGenre = (app) => async(req, rep) => {
    const genres = app.mongo.db.collection('genres');

    let genre =  req.body;

    let result = await genres.count({style: genre.style});

    if(result > 0) throw new ALREADY_EXISTS();
}
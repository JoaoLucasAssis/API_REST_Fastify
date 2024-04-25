import { ALREADY_EXISTS } from "../../../libs/error.js"

export const MovieExists = (app) => async(req, rep) => {
    const movies = app.mongo.db.collection('movies');

    let movie =  req.body;

    let result = await movies.count({title: movie.title});

    if(result > 0) throw new ALREADY_EXISTS();
}
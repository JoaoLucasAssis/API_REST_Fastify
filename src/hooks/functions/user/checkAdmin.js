import { PROPERTY_ISADMIN_FALSE } from "../../../libs/error.js"

export const checkAdmin = (app) => async(req, rep) => {
    if(!req.body.isAdmin){
        throw new PROPERTY_ISADMIN_FALSE();
    }
}
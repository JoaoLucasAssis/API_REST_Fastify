import { ADMIN_PROPERTY_NOT_FOUND } from "../../../libs/error.js"

export const AdminExists = (app) => async (req, rep) => {
    if (!req.body.isAdmin) {
        throw new ADMIN_PROPERTY_NOT_FOUND();
    }
}
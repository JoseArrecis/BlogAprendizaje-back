import { Router } from "express";
import { 
    loginValidator, 
    registerValidator 
} from "../../helpers/validators";
import { deleteFileOnError } from "../../middlewares/delete.file.on.error.js"
import { 
    login, 
    register 
} from "./auth.controller";

const api = Router()

api.post(
    '/register',
    [
        registerValidator,
        deleteFileOnError
    ],
    register
)

api.post(
    '/login',
    [
        loginValidator
    ],
    login
)

export default api
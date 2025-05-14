import { Router } from "express";
import { 
    addComment, 
    deleteComment, 
    updateComment
} from "./comment.controller.js";

const api = Router()

api.post(
    '/',
    addComment
)

api.put(
    '/:id',
    updateComment
)

api.delete(
    '/:id',
    deleteComment
)

export default api
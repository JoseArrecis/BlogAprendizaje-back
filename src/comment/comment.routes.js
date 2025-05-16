import { Router } from "express";
import { 
    addComment, 
    getCommentById, 
} from "./comment.controller.js";

const api = Router()

api.post(
    '/',
    addComment
)

api.get(
    '/:id',
    getCommentById
)

export default api
import { Router } from "express";
import { 
    createPost, 
    deletePost, 
    filterByCourse, 
    filterByDate, 
    filterByTitle, 
    getAllPosts, 
    getPostById, 
    updatePost
} from "./post.controller.js";

const api = Router()

api.post(
    '/',
    createPost
)

api.get(
    '/getAll',
    getAllPosts
)

api.get(
    '/:id',
    getPostById
)

api.put(
    '/:id',
    updatePost
)

api.delete(
    '/:id',
    deletePost
)

api.get(
    '/filter/course',
    filterByCourse
)

api.get(
    '/filter/title',
    filterByTitle
)

api.get(
    '/filter/date',
    filterByDate
)

export default api
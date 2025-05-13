import { Router } from "express";
import { 
    createPost, 
    filterByCourse, 
    filterByDate, 
    filterByTitle, 
    getAllPosts, 
    getPostById 
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
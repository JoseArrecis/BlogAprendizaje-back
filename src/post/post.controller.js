import Post from './post.model.js'
import Comments from '../comment/comment.model.js'

export const createPost = async(req, res)=>{
    try {
        const { title, description, course } = req.body

        if(!title || !description || !course) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'All fields are required'
                }
            )
        }

        const validCourses = ['Tecnologia', 'Practica Supervisada', 'Taller']
        if(!validCourses.includes(course)){
            return res.status(400).send(
                {
                    success: false,
                    message: 'Invalid course value'
                }
            )
        }

        const newPost = new Post({ title, description, course })
        await newPost.save()

        return res.status(201).send(
            {
                success: true,
                message: 'Post created successfully',
                newPost
            }
        )
    }catch (err) {
        console.error(err);
        return res.status(500).send(
            { 
                success: false, 
                message: 'General error', 
                err 
            }
        )
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate(
            {
                path: 'comments',
                select: 'user content date'
            }
        )

        return res.status(200).json(
            {
            success: true,
            posts
            }
        )
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            {
                success: false,
                message: 'Error fetching posts',
                error
            }
        )
    }
}

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id)
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'username'
                },
                options: { sort: { date: -1 } }
            });

        if (!post) {
            return res.status(404).send({
                success: false,
                message: 'Post not found'
            });
        }

        return res.send({
            success: true,
            post
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        });
    }
};

export const filterByCourse = async (req, res) => {
    try {
        const { course } = req.params

        if (!course) {
            return res.status(400).json(
                {
                    success: false,
                    message: "No se encontró el curso",
                }
            )
        }

        const Posts = await Post.find({ course: { $regex: `^${course}$`, $options: "i" } })
            .populate('comments')

        return res.status(200).json(
            {
                success: true,
                total: Posts.length,
                Posts,
            }
        )
    }catch (err) {
        console.error(err);
        return res.status(500).send(
            { 
                success: false, 
                message: 'General error', 
                err 
            }
        )
    }
}

export const filterByTitle = async (req, res) => {
    try {
        const { title } = req.params

        if (!title) {
            return res.status(400).json(
                {
                    success: false,
                    message: "No se encontró el título",
                }
            )
        }

        const Posts = await Post.find({ title: { $regex: title, $options: "i" } })
            .populate('comments')

        return res.status(200).json(
            {
                success: true,
                total: Posts.length,
                Posts,
            }
        )
    }catch (err) {
        console.error(err);
        return res.status(500).send(
            { 
                success: false, 
                message: 'General error', 
                err 
            }
        )
    }
}

export const filterByDate = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query

        if (!fechaInicio || !fechaFin) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Los parámetros 'fechaInicio' y 'fechaFin' son obligatorios",
                }
            )
        }

        const fechaInicioObj = new Date(fechaInicio)
        fechaInicioObj.setHours(0, 0, 0, 0)

        const fechaFinObj = new Date(fechaFin)
        fechaFinObj.setHours(23, 59, 59, 999)

        const Postes = await Post.find(
            {
                fechaPost: {
                    $gte: fechaInicioObj,
                    $lte: fechaFinObj,
                },
            }
        ).populate("comentarios");

        return res.status(200).json({
            success: true,
            total: Postes.length,
            Postes,
        });
    }catch (err) {
        console.error(err);
        return res.status(500).send(
            { 
                success: false, 
                message: 'General error', 
                err 
            }
        )
    }
}
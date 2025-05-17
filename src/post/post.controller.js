import Post from './post.model.js'

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

        const validCourses = ['Cocina', 'Mueblería', 'Programación']
        if(!validCourses.includes(course)){
            return res.status(400).send(
                {
                    success: false,
                    message: 'Invalid course value'
                }
            )
        }

        const newPost = new postMessage({ title, description, course })
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

export const getAllPosts = async(req, res)=>{
    try {
        const { course } = req.query
        const filter = course ? { course } : {}

        const posts = await Post.find(filter).sort({ created: -1 })
        return res.send(
            {
                success: true,
                total: posts.length,
                posts
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

export const getPostById = async(req, res)=>{
    try {
        const { id } = req.params
        
        const post = await Post.findById(id)
        if(!post){
            return res.status(
                {
                    success: false,
                    message: 'Post not found'
                }
            )
        }

        const comments = await Comment.find({ postId: id }.sort({ createdAt: -1 }))
        
        return res.send(
            {
                success: true,
                post,
                comments
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

        const Posts = await Post.find({ course: { $regex: `^${course}$`, $options: "i" } });

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

        const Posts = await Post.find({ title: { $regex: title, $options: "i" } });


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
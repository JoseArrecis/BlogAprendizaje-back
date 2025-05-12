import Post from '../models/Post.js'

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

export const updatePost = async(req, res)=>{
    try {
        const { id } = req.params
        const { title, description, course } = req.body
        
        const post = await Post.findById(id)
        if(!post){
            return res.status(404).send(
                {
                    sucecss: false,
                    message: 'Post not found'
                }
            )
        }

        const updatePost = await Post.findbyIdAndUpdate(
            id,
            { title, description, course },
            { new: true, runValidators: true }
        ) 

        return res.send(
            {
                success: true,
                message: 'Post updated successfully',
                post: updatePost
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

export const deletePost = async(req, res)=>{
    try {
        const { id } = req.params
        
        const post = await Post.findById(id)
        if(!post){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Post not found'
                }
            )
        }

        await post.deleteOne()
        return res.send(
            {
                success: true,
                message: 'Post deleted succesfully'
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
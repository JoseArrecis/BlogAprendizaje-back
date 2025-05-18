import Comment from "./comment.model.js";
import Post from "../post/post.model.js";

export const addComment = async (req, res) => {
    try {
        const { user, content, post } = req.body

        const nuevoComment = new Comment(
            {
                user,
                content,
                post
            }
        )

        await nuevoComment.save()

        await Post.findByIdAndUpdate(
            post,
            { $push: { comments: nuevoComment._id } }, 
            { new: true }
        )

        const CommentCompleto = await Comment.findById(nuevoComment._id)
            .populate('post', 'title')

        return res.status(201).json(
            {
                success: true,
                message: "Comment created succesfully",
                Comment: CommentCompleto,
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

export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params
        const comment = await Comment.findById(id).populate('post', 'title')

        if (!comment) {
            return res.status(404).send(
                { 
                    success: false, 
                    message: 'Comentario no encontrado' 
                }
            )
        }

        return res.json({ success: true, comment });
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
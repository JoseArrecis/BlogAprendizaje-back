import Comment from "./comment.model.js";
import Post from "../post/post.model.js";

export const addComment = async (req, res) => {
    try {
        const { usuario, contenidoComentario, PostId } = req.body    

        const nuevoComentario = new Comentario({
            usuario,
            contenidoComentario,
            Post: PostId,
        }
    )

        await nuevoComentario.save()

        await Post.findByIdAndUpdate(
            PostId,
            { $push: { comentarios: nuevoComentario._id } },
            { new: true }
        )

        const comentarioCompleto = await Comentario.findById(nuevoComentario._id)
            .populate('Post', 'tituloPost')

        return res.status(201).json(
            {
                success: true,
                message: "Comentario agregado correctamente",
                comentario: comentarioCompleto,
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

export const updateComment = async(req, res)=>{
    try {
        const { id } = req.params
        const { text } = req.body

        const comment = await Comment.findById(id)
        if(!comment){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Comment not found'
                }
            )
        }

        const updateComment = await Comment.findByIdAndUpdate(
            id,
            { text },
            { new: true, runValidators: true }
        )

        return res.send(
            {
                success: true,
                message: 'Comment updated succesfully',
                comment: updateComment
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

export const deleteComment = async(req, res)=>{
    try {
        const { id } = req.params

        const comment = await Comment.findById(id)
        if(!comment){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Comment not found'
                }
            )
        }

        await comment.deleteOne()
        return res.send(
            {
                success: true,
                message: 'Comment deleted succesfully'
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

export const getCommentsByPost = async (req, res) => {
    try {
        const { uidPublic } = req.params;

        const Post = await Post.findById(uidPublic).populate(
            {
                path: "comentarios",
                select: "contenidoComentario usuario _id createdAt updatedAt",
            }
        )

        if (!Post) {
            return res.status(404).json(
                {
                    success: false,
                    message: "The post specify not exists",
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                message: "Comments on the post",
                comentarios: Post.comentarios,
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
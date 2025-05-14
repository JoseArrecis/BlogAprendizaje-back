import Comentario from "./comentarios.model.js";
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

export const editComment = async (req, res) => {
    try {
        const { comentarioId } = req.params
        const { contenidoComentario } = req.body

        if (!contenidoComentario) {
            return res.status(400).json(
                {
                    success: false,
                    message: "El contenido del comentario es obligatorio",
                }
            )
        }

        const comentarioActualizado = await Comentario.findByIdAndUpdate(
            comentarioId,
            { contenidoComentario },
            { new: true }
        )

        if (!comentarioActualizado) {
            return res.status(404).json(
                {
                    success: false,
                    message: "El comentario especificado no existe",
                }
            )
        }

        res.status(200).json({
            success: true,
            message: "Comentario editado correctamente",
            comentario: comentarioActualizado,
        });
    } catch (err) {
        res.status(500).json(
            {
                success: false,
                message: "Error al editar el comentario",
                error: err.message,
            }
        )
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { comentarioId } = req.params;

        const comentarioEliminado = await Comentario.findByIdAndDelete(comentarioId);

        if (!comentarioEliminado) {
            return res.status(404).json(
                {
                    success: false,
                    message: "El comentario especificado no existe",
                }
            )
        }

        await Post.findByIdAndUpdate(
            comentarioEliminado.Post,
            { $pull: { comentarios: comentarioId } }
        )

        res.status(200).json(
            {
                success: true,
                message: "Comentario eliminado correctamente",
                comentario: comentarioEliminado,
            }
        )
    } catch (err) {
        res.status(500).json(
            {
                success: false,
                message: "Error al eliminar el comentario",
                error: err.message,
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
                    message: "La publicación especificada no existe",
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                message: "Comentarios de la publicación",
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
export const verPost = async (req, res) => {
    try {
        const Post = await Post.find().populate("comentarios", "contenidoComentario usuario _id")

        res.status(200).json(
            {
                success: true,
                message: "Lista de Postes",
                Post,
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


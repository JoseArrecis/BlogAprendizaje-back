import { model, Schema } from "mongoose";

const postSchema = Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            maxLength: [75, 'Can´t be overcome 50 characters']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        course: {
            type: String,
            required: [true, 'Course is required'],
            enum: ['Tecnologia', 'Practica Supervisada', 'Taller']
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

export default model('Post', postSchema)
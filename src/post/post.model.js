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
        courses: {
            type: String,
            required: [true, 'Courses is required'],
            enum: ['Tecnología', 'Practica Supervisada', 'Taller']
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        status: {
            type: Boolean,
            default: true
        }
    }
)

export default model('Post', postSchema)
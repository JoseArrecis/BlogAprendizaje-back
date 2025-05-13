import { model, Schema } from "mongoose";

const commentSchema = Schema(
    {
        user: {
            type: String,
            required: [true, 'User is required'],
            maxLength: [100, 'the user must not exceed 100 characters']
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
            maxLength: [500, 'The content must not exceed 500 characters']
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: [true]
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

export default model('Comment', commentSchema)
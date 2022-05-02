import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    chat: {
        type: Schema.ObjectId,
        ref: 'Chat',
        required: 'Chat is required',
    },
    owner: {
        type: Schema.ObjectId,
        ref: 'User',
        required: 'Owner is required',
    },
    content: String,    

    deletedAt: Date,
}, { timestamps: true });

messageSchema.index({ createdAt: true });

const Message = mongoose.model('message', messageSchema);

export default Message;
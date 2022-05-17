import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    conversation: {
        type: Schema.ObjectId,
        ref: 'Conversation',
        required: 'Conversation is required',
    },
    owner: {
        type: Schema.ObjectId,
        ref: 'User',
        required: 'User is required',
    },
    content: String,
    parent: {
        type: Schema.ObjectId,
        ref: 'Chat',
      },  

    deletedAt: Date,
}, { timestamps: true });

messageSchema.index({ createdAt: true });

const Message = mongoose.model('message', messageSchema);

export default Message;
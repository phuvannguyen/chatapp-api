import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    room: {
        type: Schema.ObjectId,
        ref: 'Room',
        required: 'Room is required',
      },
    parent: {
        type: Schema.ObjectId,
        ref: 'Chat',
    },
    firstMessageDate: Date,
    lastMessageDate: Date,
    sticky: {// use sticky this message in the top of convertation
        type: Schema.ObjectId,
        ref: 'Message',
      },
    closed: Boolean,
}, { timestamps: true })

const Chat = mongoose.model('chat', chatSchema);

export default Chat;
import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    title: String,
    descrition: String,
    owner: { // _id of the owner user.
        type: Schema.ObjectId,
        ref: 'User',
        required: 'Owner is required',
        index: true,      

    },    
    member: [{
        type: Schema.ObjectId,
        ref: 'User',
        required: 'Owner is required',
        index: true, 
        }         
    ],

    sticky: {// use sticky this message in the top of convertation
      type: Schema.ObjectId,
      ref: 'Message',
    }    
    
    
}, { timestamps: true })

const Conversation = mongoose.model('conversation', conversationSchema);

export default Conversation;
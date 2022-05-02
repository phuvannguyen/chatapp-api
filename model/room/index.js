import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    title: String,
    descrition: String,
    owner: { // _id of the owner user.
        type: Schema.ObjectId,
        ref: 'User',
        required: 'Owner is required',
        index: true,      

    },
    isPrivate: Boolean, //whether the room is private or public.
    member: [{
        type: Schema.ObjectId,
        ref: 'User',
        required: 'Owner is required',
        index: true, 
        }         
    ]
}, {timestamps: true});

const Rooms = mongoose.model("room", roomSchema);
export default Rooms;
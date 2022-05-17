import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {//type: String
        type: String,
        index: true,
        unique: true,
        sparse: true
    },
    email: {//type: String
        type: String,
        index: true,
        unique: true,
        sparse: true
    },
    password: String,
    // passwordResetToken: String, // when user forget password, will send a token. Then user type it, can change forget password.
    // passwordResetExpires: Date, // time limit token.
    github: {//GitHub’s profile id
        type: String,        
        unique: true,
        sparse: true
    },    
    google: {//Google’s profile id
        type: String,        
        unique: true,
        sparse: true
    },

    profile: {
        name: String,
        avatar_url: String,
        location: String,
        status: String,
        gender: String

    },
    // tokens: [{//: list of linked services tokens
    //     _id: false,
    //     service: String, // service name (i.e. github)
    //     accessToken: String//access token given by the service. 

    // }

    // ]  



}, {timestamps: true});

const Users = mongoose.model("users", userSchema);

export default Users;
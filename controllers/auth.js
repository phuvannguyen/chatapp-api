import Users from "../model/user/index.js";
import bcrypt from "bcrypt"
import dotenv from 'dotenv'
import jwt  from "jsonwebtoken"

dotenv.config();

export const login = async (req, res) => {
    const { username, password} = req.body;    
    //hash password to compare password in database
    const hashPassword = bcrypt.hashSync(password, 10);
    let isUser;
    try {
        isUser = await Users.findOne({username, hashPassword}).exec();                    
        
    } catch (error) {
        res.status(500).send(err);
        return       
        
    };

    if (!isUser) {
       res.status(500).send("Error: Wrong username or password");
       return        
    };

    //send JWT
    const privateKey = process.env.ACCESS_SECRET;
    jwt.sign({username: username, password: password}, privateKey, { algorithm: 'HS256' }, function(err, token) {
        if (err) {
            console.log(err);
            return res.status(400).send({ message: err });
            
          };        
        res.json({token: token})
    });
    console.log("Login", username, password)
    

};

export const registation = async(req, res) => {
    const {username, email, password} = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    let isUsername;
    let isEmail;
    try {
        isUsername = await Users.findOne({username});
        isEmail = await Users.findOne({email})
    } catch (error) {
        res.status(500).send(error);
        return
        
    };

    if (isUsername) {
        res.status(500).send("Error: Exist username");
        return 

    };

    if (isEmail) {
        res.status(500).send("Error: Exist email");
        return 

    };

    try {
        await Users.create({username, email, password: hashPassword});
        console.log(username, email, hashPassword);
        res.status(200).send("Success");        
                
    } catch (error) {
        
        res.status(400).send(error)
        console.log(error)
    }    


}




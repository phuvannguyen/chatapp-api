import Users from "../model/user/index.js";
import bcrypt from "bcrypt"
import dotenv from 'dotenv'
import jwt  from "jsonwebtoken"

dotenv.config();

const login = async (req, res) => {
    const { username, password} = req.body;
    console.log(username, password)
    //hash password to compare password in database
    const hashPassword = bcrypt.hashSync(password, 10);
    let isUser;
    try {
        isUser = await Users.findOne({username, password}).exec();
        console.log(isUser)            
        
    } catch (error) {
        res.status(500).send(err);
        return       
        
    };

    if (!isUser) {
       res.status.send("Error: Wrong username or password");
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

    


    



    

    




}

export default login;
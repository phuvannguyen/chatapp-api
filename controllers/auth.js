import Users from "../model/user/index.js";
import bcrypt from "bcrypt"
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"

dotenv.config();

export const login = async (req, res) => {
    const { username, password } = req.body;
    //hash password to compare password in database
    const hashPassword = bcrypt.hashSync(password, 10);
    let userFound;
    try {
        userFound = await Users.findOne({ username }).exec();

    } catch (error) {
        res.status(500).send(error);
        return

    };

    if (!userFound) {
        res.status(500).send("Error: Wrong username or password");
        return
    };

    try {
        const isMatchPass = await bcrypt.compare(password, userFound.password);
        
    } catch (error) {
        res.status(500).send("Error: Wrong username or password");
        return;
        
    }    

    //send JWT
    const privateKey = process.env.ACCESS_SECRET;
    jwt.sign({ username: username, testdata1: 111, id: userFound._id }, privateKey, { algorithm: 'HS256' }, function (err, token) {
        if (err) {
            console.log(err);
            return res.status(400).send({ message: err });

        };
        return res.json({ token, user: userFound })
    });
    


};

export const registation = async (req, res) => {
    const { username, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    let isUsername;
    let isEmail;
    try {
        isUsername = await Users.findOne({ username });
        isEmail = await Users.findOne({ email })
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
        await Users.create({ username, email, password: hashPassword });
        console.log(username, email, hashPassword);
        return res.status(200).send("Success");

    } catch (error) {
        console.log(error);
        return res.status(400).send(error)
        
    }


}




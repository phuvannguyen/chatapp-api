import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from 'dotenv'
import cors from "cors"
import http from "http"
import Users from "./model/user/index.js"
import {login, registation} from "./controllers/auth.js"
import { authenToken } from "./middleware/index.js"

//app config
const app = express();
dotenv.config();
const port = process.env.PORT

const corsOptions = {
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}
app.use(cors(corsOptions))

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const server = http.createServer(app)

//DB config
const url = process.env.url_Mongoodb;

try {
    await mongoose.connect(url);
    console.log("Connected with Mongodb")
  } catch (error) {
    console.log(error);
    console.log("No connected with Mongodb")
  }

//router

app.get("/", authenToken, (req, res) => {
    res.send("Hello world. This is Phu Nguyen")
    
});

app.post("/api/user", (req, res) => {
  Users.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  });
  


});

app.post("/api/login", login);

app.post("/api/registation", registation)




server.listen(port, () => {
    console.log("Hi port:" + port)
})


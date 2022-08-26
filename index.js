import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from 'dotenv'
import cors from "cors"
import http from "http"
import router from "./router/index.js"
import { Server } from "socket.io"
import controllerHandler from "./socket/index.js"

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
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);

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
app.use(router)

//socket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }

});

io.on('connection', controllerHandler);




server.listen(port, () => {
    console.log("Hi port:" + port)
})


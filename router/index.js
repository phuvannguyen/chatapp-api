import express from "express"
import { authenToken } from "../middleware/index.js";
import Users from "../model/user/index.js";
import {login, registation} from "../controllers/auth.js"
import { getRooms, postRooms } from "../controllers/room.js";
//app config
const router = express.Router();

//router for room
    //List of rooms
router.get("/api/" + "rooms", authenToken, getRooms)
    //Create a new room
router.post("/api/" + "rooms", authenToken, postRooms)

router.get("/", authenToken, (req, res) => {
    res.send("Hello world. This is Phu Nguyen")
    
});

router.post("/api/user", (req, res) => {
  Users.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  });
  


});

router.post("/api/login/", login);

router.post("/api/registation/", registation);

export default router;
import express from "express"
import { authenToken } from "../middleware/auth.js";
import { isRoomIdValid, isRoomOwner } from "../middleware/room.js";
import Users from "../model/user/index.js";
import {login, registation} from "../controllers/auth.js"
import { getRooms, postRooms, filterRoom, getOneRoom, editRoom, joinRoom, leaveRoom, deleteRoom, findJoinedByUser } from "../controllers/room.js";
import { chats, createChat, deleteChat, editChat, getChat } from "../controllers/chat.js";
import { isChatIdValid } from "../middleware/chat.js";
import { findUser, users } from "../controllers/user.js";
import { isUserValid } from "../middleware/user.js";
//app config
const router = express.Router();

/**
 * Users
 */
 router.get("/api/" + 'users', users); 
 router.get("/api/" + 'users/:_id', isUserValid, findUser);
 
 // User -> Room. 
// User -> Room.
  router.get('/api/users/:_idOwner/:_idMember/', findJoinedByUser);
  // router.get('/api/users/:_id/rooms/owned', c(room.findOwnerByUser, (req) => [req.params._id]));
 

//router for room
    //List of rooms
router.get("/api/" + "rooms", authenToken, getRooms)
    //Create a new room
router.post("/api/" + "rooms", authenToken, postRooms)
    //Filter rooms 
router.get("/api/" + "rooms/" + "search", authenToken, filterRoom)
    // Get a room
router.get("/api/" + "rooms/:_id", authenToken, isRoomIdValid, getOneRoom)
    // Edit name room
router.patch("/api/" + 'rooms/:_id', authenToken, isRoomIdValid, isRoomOwner, editRoom);

router.post("/api/" + 'rooms/:_id/join', authenToken, isRoomIdValid, joinRoom);
router.post("/api/" + 'rooms/:_id/leave', authenToken, isRoomIdValid, leaveRoom);
router.delete('/api/' + 'rooms/:_id', authenToken, isRoomIdValid, isRoomOwner, deleteRoom);

// Room -> Chat.
router.get('/api/' + 'rooms/:_id/chats', isRoomIdValid, chats);
router.post('/api/' + 'rooms/:_id/chats', authenToken, isRoomIdValid, isRoomOwner, createChat);

/**
 * Chats
 */
router.get('/api/' + 'chats/:_id', isChatIdValid, getChat);
router.patch('/chats/:_id', isChatIdValid, editChat);
router.delete('/chats/:_id', authenToken, isChatIdValid, deleteChat)

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
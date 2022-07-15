import Users from "../model/user/index.js";

// Current logged in user.
// export const whoami = (currentUser) => {
//     return chain
//       .then(() => findAuthentication(currentUser))
//       .then(() => findUser(currentUser._id));
//   };
  
  // Returns all users.
  export const users = async (req, res, next) => {
    Users.find({}, (error, users) => {
        if (error) {
            return res.status(500).send(error)
        };

        if (!users) {
            return res.status(500).send("No user existed")
        };

        return res.status(200).json(users);
    })
    
  };
  
  // Returns the user that matches userId.
  export const findUser = async (req, res, next) => {
    const user = req.user;        
    return res.status(200).json(user)
  };

  //join a room
  

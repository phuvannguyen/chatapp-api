import Users from "../model/user/index.js";

// Check if user id exists on the database.
export const isUserValid = async (req, res, next) => {
    const { _id } = req.params;    
    Users.findById({_id: _id}, (error, user) => {
        if (error) {
            return res.status(500).send(error)
        };

        if (!user) {
            return res.status(500).send("This user not existed")
        };
              
        req.user = user;        
        next();
              

    }); 
    

}

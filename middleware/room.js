import Conversation from "../model/conversation/index.js";


// identify id existed or  not.
export const isRoomIdValid = async (req, res, next) => {
    const { _id } = req.params;    
    let roomId;
    if (!_id) {
        res.status(500).send("No Exist");
        return;
    };

    try {
        roomId = await Conversation.findById({_id: _id}).exec()
        
    } catch (error) {
        res.status(500).send(error);
        return;
        
    };    

    if (!roomId) {
        res.status(500).send("Room did't existed")
    };

    req.room = roomId;
    next();

};
// identify id  of owner existed or  not.
export const isRoomOwner = async (req, res, next) => {
    const {_id} = req.query;
    Conversation.find({owner: _id}, (error, owner) => {
        if (error) {
            res.status(500).send(error);
            return;
        };

        if (!owner) {
            res.status(500).send("Owner is not existed");
            return;
        };

        req.owner = owner


    })
    next();

}
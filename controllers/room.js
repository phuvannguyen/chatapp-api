import Conversation from "../model/conversation/index.js";


export const getRooms = async (req, res) => {        
    const { _id } = req.query;             
    let rooms;
    try {
        rooms = await Conversation.find({$or:[{owner: _id},{member: [_id]}]}).exec()
    } catch (error) {
        res.status(500).send(error);
        return        
    };
        
    return res.status(200).json(rooms)


};


export const postRooms = async (req, res) => {
    const {_id, title, descrition, member} = req.body;
    
    let newRooms;
    try {
        newRooms = await Conversation.create({title, descrition, owner: _id, member: [member]})
    } catch (error) {
        res.status(500).send(error);
        return        
    };

    return res.status(200).json(newRooms)    

    
}


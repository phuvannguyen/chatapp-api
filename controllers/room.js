import Conversation from "../model/conversation/index.js";

//get room
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

// post rooms
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
//Filter rooms by providing optional query parameters: _id or title.
export const filterRoom = async (req, res) => {
    const {_id, title} = req.query;    
    let roomSearch;
    let validateTile;
    if (typeof _id === "undefined" && typeof title === "undefined") {
        res.status(500).send("Error typing")
    };

    if (_id) {
        try {
            roomSearch = await Conversation.findById({_id: _id})
        } catch (error) {
            res.status(500).send(error);
            return;
            
        };

        if (!roomSearch) return res.status(500).send("Can't search");
        return res.status(200).json(roomSearch);

    };

    if (title) {
        validateTile = title.trim();
        try {
            roomSearch = await Conversation.find({title: validateTile})  
            
        } catch (error) {
            res.status(500).send(error);
            return;
            
        };

        return res.status(200).json(roomSearch);
    }   
    
};

// Get a specific room given an existing room identifier.

export const getOneRoom = async (req, res, next) => {
    const room = req.room;

    return res.status(200).json(room)
}

// Update a specific room given an existing room
// identifier and valid room fields.

export const editRoom = async (req, res, next) => {
    const room = req.room;
    const {_id} = room;
    const updateName  = req.body.title;
    Conversation.findByIdAndUpdate({_id: _id}, {title: updateName}, {returnOriginal: false}, (error, newName) => {
        if (error) {
            res.status(500).send(error);
            return;
        };

        if (!newName) {
            res.status(500).send("id is not right")
        };

        return res.status(200).json(newName);

        
    })
};

export const joinRoom = async (req, res, next) => {
    const room = req.room;
    const {_id} = room;
    const idJoiner = req.body._id;
    let roomId;
    try {
        roomId = await Conversation.findById({_id: _id}).exec();
    } catch (error) {
        res.status(500).send(error)
        
    };
    roomId.member.push(idJoiner);
    await roomId.save();
    res.status(200).json(roomId);
};

export const leaveRoom = async (req, res, next) => {
    const room = req.room;
    const {_id} = room;
    const idLeaver = req.body._id;
    let roomId;
    try {
        roomId = await Conversation.findById({_id: _id}).exec();
    } catch (error) {
        res.status(500).send(error)
        
    };  
    
    roomId.member.pull(idLeaver);    
    await roomId.save();
    res.status(200).json(roomId);
}

export const deleteRoom = async (req, res, next) => {
    const room = req.room;
    const {_id} = room || undefined;
    Conversation.findByIdAndDelete({_id: _id}, (error, data) => {
        if (error) {
            return res.status(500).send(error)
        };
        res.status(200).json();
    })
}

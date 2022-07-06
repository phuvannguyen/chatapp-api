import Message from "../model/messages/index.js";

export const isChatIdValid = async (req, res, next) => {
    const { _id } = req.params;    
    let chatId;
    if (!_id) {
        res.status(500).send("No Exist");
        return;
    };

    try {
        chatId = await Message.findById({_id: _id}).exec()
        
    } catch (error) {
        res.status(500).send(error);
        return;
        
    };    

    if (!chatId) {
        res.status(500).send("Chat did't existed")
    };

    req.chat = chatId;
    next();
}
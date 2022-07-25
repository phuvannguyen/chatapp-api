import Message from "../model/messages/index.js";

export const chats = async (req, res, next) => {
    const room = req.room;
    const { _id } = room;
    Message.find({conversation: _id}).populate("owner", "username profile").exec((error, chats) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error)
        };
        return res.status(200).json(chats);

    })
}


export const createChat = async (req, res, next) => {
    const room = req.room;
    const owner = req.owner;
    const { content } = req.body;
    const ownerId = owner[0].owner;   
    Message.create({
        conversation:room._id,
        owner: ownerId,
        content: content
    }, (error, data) => {
        if (error) {
            return res.status(500).send(error)
        };
        return res.status(200).json(data);       

    })
     
}

export const getChat = async (req, res, next) => {
    const chat = req.chat;
    return res.status(200).send(chat);

}

export const editChat = async (req, res, next) => {
    const chat = req.chat;    
    const { _id } = chat;
    const editContent = req.body.content;

    Message.findByIdAndUpdate({_id: _id}, {content: editContent}, {returnOriginal: false}, (error, newChat) => {
        if (error) {
            return res.status(500).send(error)
        };

        if (!newChat) {
            return res.status(500).send("No exist")
        }

        return res.status(200).json(newChat)
        

    })

}

export const deleteChat = async (req, res, next) => {
    const chat = req.chat;
    const { _id } = chat;

    Message.findByIdAndDelete({_id}, (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).send(error)
        };
        

        if (!data) {
            res.status(500).send("Can't delete")
        };

        return res.status(200).json("Deleted")

})


}

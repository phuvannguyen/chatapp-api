
let users = []; //data structure type: [{roomId, members: {userId, socketId}}]

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&  users.push({userId, socketId}); 
  
};
const removeUser = (socketId) => {  
  users = users.filter((user) => user.socketId !== socketId)
};

const getUser = (userId) => {  
  return users.find((user) => user.userId === userId)
};

export default function connectionHandler(io, socket) {
  const socketId = socket.id;
    
  /**
   * Listen for user commands.
   */
  console.log(`⚡︎ New connection: ${socketId}`);

  socket.on('disconnect', () => {
    console.log(`⚡︎ Disconnection: ${socketId}`);
    removeUser(socketId);
    let rooms = socket.rooms;
    rooms.forEach(room => {      
      socket.leave(room);
      
    });    

    
  });
  //add user to users list
  socket.on("addUser", ({userId, idRoom}) => {
    addUser(userId, socketId, idRoom);
    socket.emit("getUser", users);
    
  });  

  //send and receive messages
  socket.on("createChat", ({chat}) => {    
    
    if (!socket.rooms.has(chat.conversation)) {
      socket.join(chat.conversation);
    };
    console.log(socket.rooms);
    console.log(chat);   
    io.to(chat.conversation).emit('receiveMessage', chat);   
    
    
  });

  //handle onGreeting event
  socket.on("onGreeting", async(room) => {    
    await socket.join(room);
    

  })

  

  
  
}
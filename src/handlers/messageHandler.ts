import { Socket } from "socket.io";

const messageHandler = (socket : Socket)=>{

    const newMessage = ({chat, roomId, userName}: {chat: string,
        roomId: string, userName: string})=>{
        socket.to(roomId).emit("new-message", {chat, userName});
    };

    socket.on("new-message", newMessage);

};

export default messageHandler;
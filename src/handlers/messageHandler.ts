import { Socket } from "socket.io";

const messageHandler = (socket : Socket)=>{

    const newMessage = ({data, roomId}: {data: string, roomId: string})=>{
        socket.to(roomId).emit("new-message", {data});
    };

    socket.on("new-message", newMessage);

};

export default messageHandler;
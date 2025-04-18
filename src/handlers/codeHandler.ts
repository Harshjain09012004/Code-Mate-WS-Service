import { Socket } from "socket.io";

const codeHandler = (socket : Socket)=>{

    const syncCode = ({code, roomId}: {code: string, roomId: string})=>{
        socket.to(roomId).emit("update-code", {newCode: code});
    };

    socket.on("sync-code", syncCode);

};

export default codeHandler;
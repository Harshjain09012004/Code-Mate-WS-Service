import { Socket } from "socket.io";

const codeHandler = (socket : Socket)=>{

    const syncCode = ({code, roomId}: {code: string, roomId: string})=>{
        socket.to(roomId).emit("update-code", {newCode: code});
    };

    socket.on("sync-code", syncCode);
};

export default codeHandler;


// import { Socket } from "socket.io";

// type FileNodeData = {
//   id: string;
//   name: string;
//   type: "file" | "folder";
//   children?: FileNodeData[];
//   data?: string;
// };

// const codeHandler = (socket : Socket)=>{

//     const syncCode = ({code, roomId, filePath}: 
// {code: string, roomId: string, filePath: string})=>{
//         socket.to(roomId).emit("update-code", {newCode: code, filePath});
//     };

//     const updateTree = ({treeData, id}: {treeData: FileNodeData[], id:string})=>{
//         socket.to(id).emit("update-tree", {tree: treeData});
//         console.log(treeData);
//     };

//     socket.on("sync-code", syncCode);
//     socket.on("file-updates", updateTree);
// };

// export default codeHandler;
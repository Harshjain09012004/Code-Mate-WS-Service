import { Socket } from "socket.io";
import { v4 as UUIDv4 } from "uuid";
import { io } from "..";

// It contains roomId corresponding to the participants list
const rooms : Record<string, string[]> = {};

// It stores the mapping for the clientId to its Name
const IdNameMapping : Record<string, string> = {}; // key -> Id, Value -> Name

const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        // this will be our unique room id in which multiple
        // connection will exchange data
        const roomId = UUIDv4();
        rooms[roomId] = []; // Create the key for current room

        // we will make the socket connection enter a new room
        // socket.join(roomId);

        // we will emit an event from server side that
        // socket connection has been added to a room
        socket.emit("room-created", { roomId });
        console.log("Room created with id", roomId);
    };

    /**
     * The below function will be called each time when a
     * creator or participant joins the room
     */
    const joinRoom = ({roomId, peerId}: {roomId: string, peerId: string})=>{
        if(rooms[roomId]){
            rooms[roomId].push(peerId);
            socket.join(roomId); // Make the user join the socket room

            // This event will be triggered by the frontend
            // Once the user joins the room with roomId
            socket.on("ready", ()=>{
                // All the participants of the room will receive this event
                socket.to(roomId).emit("user-joined", {peerId});
            });

            console.log("New user joined room :", roomId);
            console.log("PeerId: ", peerId);
            socket.emit("get-users", {roomId, participants: rooms[roomId]});
        }
    };

    // Creates the mapping for the clientId with its name
    const updateMapping = ({clientId, userName}: {clientId: string, userName: string})=>{
        console.log("Mapping Input ", clientId, userName)
        IdNameMapping[clientId] = userName;
        console.log("Mapping", IdNameMapping);
    };

    // Fetches the name of all client in the room with roomId
    const getAllUserNames = ({roomId}: {roomId: string})=>{
        // A list of all the client ids in the room
        const clientIDs = io.sockets.adapter.rooms.get(roomId);

        // Iterating on IDs to find the corresponding name
        const allUserNames: string[] = [];
        clientIDs?.forEach((Ids)=>{
            allUserNames.push(IdNameMapping[Ids]);
        });

        socket.emit("all-userNames", {allUserNames});
    };

    // We will call the above two function when the client will
    // emit events top create room and join room
    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);

    // We use these events to handle mapping & userFetching
    socket.on("map-id-name", updateMapping);
    socket.on("get-all-userNames", getAllUserNames);
};

export default roomHandler;
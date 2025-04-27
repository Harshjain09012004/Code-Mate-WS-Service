import express from "express";
import ServerConfig from "./config/serverConfig";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import roomHandler, { IdNameMapping } from "./handlers/roomHandler";
import messageHandler from "./handlers/messageHandler";
import codeHandler from "./handlers/codeHandler";
import run from "./controller/codeRunner.controller";
import { fetchProblems, fetchProblemDescription } from "./controller/problem.controller";

const app = express();

app.use(cors());
app.use(express.json());

app.post('/run', run);
app.post('/fetchProblems', fetchProblems);
app.post('/fetchProblemDescription', fetchProblemDescription);

const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("New user connected", socket.id);

    roomHandler(socket); // pass the socket conn to the room handler for room creation and joining

    messageHandler(socket); // pass the socket conn to the message handler for chating in room

    codeHandler(socket); // pass the socket conn to the code handler to handle code editor syncing

    socket.on("myId", ()=>{
        socket.emit("Id", {id: socket.id});
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
        if(IdNameMapping[socket.id]){
            delete IdNameMapping[socket.id];
        }
    });
});

server.listen(ServerConfig.PORT, () => {
    console.log(`Server is up at port ${ServerConfig.PORT}`);
});
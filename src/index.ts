import express from "express";
import ServerConfig from "./config/serverConfig";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import roomHandler from "./handlers/roomHandler";
import messageHandler from "./handlers/messageHandler";
import codeHandler from "./handlers/codeHandler";


const app = express();

app.use(cors());

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

    socket.emit("hi", {id : socket.id});

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(ServerConfig.PORT, () => {
    console.log(`Server is up at port ${ServerConfig.PORT}`);
});
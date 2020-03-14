import { Room } from "./Core/Room";
import { Server } from './Core/server';
import { MyGameRoom } from './MyGameRoom';
import { MyGameUser } from './MyGameUser';
import { RoomFinder } from './Core/RoomFinder';
import * as express from "express";
import * as http from "http";

const port: number = (process.env.PORT && parseInt(process.env.PORT)) || 3002;

let room = new MyGameRoom();
export class DefaultRoomFinder extends RoomFinder {
    find(data: any): Room {
        return room;
    }
}
let roomFinder = new DefaultRoomFinder();

let app = express();
app.get('/', (req, res) => {
    res.send(`cool! there are ${room.users.length} users in the room`);
})
var appserver = http.createServer(app)

let server = new Server(appserver, port, (id, socket) => new MyGameUser(id, socket, roomFinder));
server.start();
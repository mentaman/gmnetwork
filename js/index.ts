import * as net from "net";
import { Socket } from "dgram";
import { Room } from "./Core/Room";
import { Server } from './Core/server';
import { MyGameRoom } from './MyGameRoom';
import { MyGameUser } from './MyGameUser';
import { RoomFinder } from './Core/RoomFinder';

let room = new MyGameRoom();
export class DefaultRoomFinder extends RoomFinder {
    find(data: any): Room {
        return room;
    }
}
let roomFinder = new DefaultRoomFinder();

let server = new Server(3002, (id, socket) => new MyGameUser(id, socket, roomFinder));
server.start();

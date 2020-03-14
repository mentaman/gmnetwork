import * as net from "net";
import { Socket } from "dgram";
import { Room } from "./Room";
import { Server } from './server';
import { MyGameRoom } from './MyGameRoom';
import { MyGameUser } from './MyGameUser';
import { RoomFinder } from './RoomFinder';

let room = new MyGameRoom();
export class DefaultRoomFinder extends RoomFinder {
    find(data: any): Room {
        return room;
    }
}

let server = new Server(3002, new DefaultRoomFinder(), (id, socket, roomFinder) => new MyGameUser(id, socket, roomFinder));
server.start();

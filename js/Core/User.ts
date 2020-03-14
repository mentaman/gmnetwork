import * as net from "net";
import { SmartBuffer } from "smart-buffer";
import { Room } from "./Room";
import { RoomFinder } from './RoomFinder';
export class User {
    id: number;
    socket: net.Socket;
    room: Room;
    roomFinder: RoomFinder;
    constructor(id: number, socket: net.Socket, roomFinder: RoomFinder) {
        this.id = id;
        this.socket = socket;
        this.onConnected();
    }

    onRoomJoined(room: Room) {}
    onRoomLeaving(room: Room) {}
    onRoomLeft(room: Room) {}

    leaveRoom() {
        if(this.room != undefined) {
            let room = this.room;
            this.onRoomLeaving(room);
            this.room = undefined;
            room.removeUser(this);
            this.onRoomLeft(room)
        }
    }
    
    setRoom(room: Room) {
        this.leaveRoom();
        this.room = room;
        this.room.addUser(this);
        this.onRoomJoined(room);
    }
    
    onConnected() {}

    sendMessageToUser(buffer: Buffer) {
        this.socket.write(buffer);
    }

    sendFromUserToRoom(buffer: Buffer) {
        this.room.broadcastToAll(this, buffer);
    }

    _gotMessage(type: number, buffer: SmartBuffer) {
        this.onGotMessage(type, buffer);
    }

    onGotMessage(type: number, buffer: SmartBuffer) {
    }

    _closed() {
        this.onClosed();
        this.leaveRoom();
    }

    onClosed() {}
}

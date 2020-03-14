import * as net from "net";
import { SmartBuffer } from "smart-buffer";
import { Room } from "./Room";
export class User {
    id: number;
    socket: net.Socket;
    room: Room;
    constructor(id: number, socket: net.Socket, room: Room) {
        this.id = id;
        this.socket = socket;
        this.room = room;
        room.addUser(this);

        this.onConnected();
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
        this.room.removeUser(this);
    }

    onClosed() {}
}

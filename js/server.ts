
import * as net from "net";
import { Room } from './Room';
import { SmartBuffer } from 'smart-buffer';
import { MyGameUser } from './MyGameUser';
import { User } from './User';

export class Server {
    port: number;
    id: number;
    room: Room;
    userCreator: (id: number, socket: net.Socket, room: Room) => User;

    constructor(port: number, roomCreator: () => Room, userCreator: (id: number, socket: net.Socket, room: Room) => User) {
        this.id = 0;
        this.port = port;
        this.room = roomCreator();
        this.userCreator = userCreator;
    }
    start() {
        const server = net.createServer();
        
        server.on('error', (err) => {
            // Handle errors here.
            console.log("server error", err);
            throw err;
        });
        server.on('connection', (socket) => {
            let user = this.userCreator(this.id++, socket, this.room);
            console.log("a user connected");
            
            socket.on('data', (data) => {
                console.log("recieved data back");
                let buff = SmartBuffer.fromBuffer(data);
                let type = buff.readUInt8();
                user._gotMessage(type, buff);
            });
            socket.on('end', () => {
                console.log('socket end');
                user._closed();
            });
            socket.on('close', () => {
                console.log('socket close');
                user._closed();
            });
            socket.on('error', (e) => {
                console.log("socket error", e);
            });
        })

        server.listen(this.port, () => {
            console.log('opened server on', server.address());
        });
    }
}
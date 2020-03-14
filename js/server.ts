
import * as net from "net";
import { Room } from './Room';
import { SmartBuffer } from 'smart-buffer';
import { MyGameUser } from './MyGameUser';
import { User } from './User';
import { RoomFinder } from './RoomFinder';

export class Server {
    port: number;
    id: number;
    userCreator: (id: number, socket: net.Socket, roomFinder: RoomFinder) => User;
    roomFinder: RoomFinder;

    constructor(port: number, roomFinder: RoomFinder, userCreator: (id: number, socket: net.Socket, roomFinder: RoomFinder) => User) {
        this.id = 0;
        this.port = port;
        this.roomFinder = roomFinder;
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
            let userId = this.id++;
            let user = this.userCreator(userId, socket, this.roomFinder);
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
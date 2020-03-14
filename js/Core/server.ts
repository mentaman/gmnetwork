
import * as net from "net";
import { SmartBuffer } from 'smart-buffer';
import { User } from './User';

export class Server {
    port: number;
    id: number;
    userCreator: (id: number, socket: net.Socket) => User;

    constructor(port: number, userCreator: (id: number, socket: net.Socket) => User) {
        this.id = 0;
        this.port = port;
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
            let user = this.userCreator(userId, socket);
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
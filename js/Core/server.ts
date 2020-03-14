
import * as net from "net";
import { SmartBuffer } from 'smart-buffer';
import { User } from './User';
import * as http from "http";

const CONNECTED_MESSAGE = 10;

export class Server {
    port: number;
    id: number;
    userCreator: (id: number, socket: net.Socket) => User;
    server: net.Server;

    constructor(server: net.Server, port: number, userCreator: (id: number, socket: net.Socket) => User) {
        this.id = 0;
        this.port = port;
        this.userCreator = userCreator;
        this.server = server;
    }
    start() {
        const server = this.server;
        
        server.on('error', (err) => {
            // Handle errors here.
            console.log("server error", err);
            throw err;
        });
        server.on('connection', (socket) => {
            socket.on('data', (connectdata) => {
                if(connectdata[0] !== CONNECTED_MESSAGE) {
                    return false;
                }

                let buff = new SmartBuffer();
                buff.writeUInt8(CONNECTED_MESSAGE);
                socket.write(buff.toBuffer());

                let userId = this.id++;
                let user = this.userCreator(userId, socket);
                console.log("a user connected");
                
                socket.removeAllListeners('data');

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
            });
        })

        server.listen(this.port, () => {
            console.log('opened server on', server.address());
        });
    }
}
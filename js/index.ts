import * as net from "net";
import { Socket } from "dgram";
import { Room } from "./Room";
import { Server } from './server';
import { MyGameRoom } from './MyGameRoom';
import { MyGameUser } from './MyGameUser';

let server = new Server(3002, () => new MyGameRoom(), (id, socket, room) => new MyGameUser(id, socket, room));
server.start();

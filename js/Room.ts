import { User } from "./User";
export class Room {
    users: User[];
    constructor() {
        this.users = [];
    }

    addUser(user: User) {
        this.users.push(user);
    }

    removeUser(user: User) {
        this.users = this.users.filter(u => u.id != user.id);
    }

    sendToAll(buffer: Buffer) {
        for(let user of this.users) {
            try {
                user.sendMessageToUser(buffer);
            } catch(e) {
                console.log("couldn't send to ", user.id);
            }
        }
    }
    
    broadcastToAll(fromUser: User, buffer: Buffer) {
        for(let user of this.users) {
            if(fromUser.id === user.id) {
                continue;
            }
            try {
                user.sendMessageToUser(buffer);
            } catch(e) {
                console.log("couldn't send to ", user.id);
            }
        }
    }
}

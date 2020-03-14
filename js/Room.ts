import { User } from "./User";
let roomIdx = 0;
export class Room {
    users: User[];
    roomIdx: number;
    constructor() {
        this.users = [];
        this.roomIdx = roomIdx++;
    }

    onUserAdded(user: User) {}
    onUserAboutToRemove(user: User) {}
    onUserRemoved(user: User) {}

    addUser(user: User) {
        this.users.push(user);
        this.onUserAdded(user);
    }

    removeUser(user: User) {
        this.onUserAboutToRemove(user);
        this.users = this.users.filter(u => u.id != user.id);
        this.onUserRemoved(user);
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

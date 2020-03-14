import { Room } from './Core/Room';

export class MyGameRoom extends Room {
    onUserAdded() {
        console.log("new user, users: "+this.users.length);
    }
    onUserRemoved() {
        console.log("bey user. users: "+this.users.length);
    }
}

import { Room } from './Room';
import { MyGameUser } from './MyGameUser';

export class MyGameRoom extends Room {
    onUserAdded() {
        console.log("new user, users: "+this.users.length);
    }
    onUserRemoved() {
        console.log("bey user. users: "+this.users.length);
    }
}

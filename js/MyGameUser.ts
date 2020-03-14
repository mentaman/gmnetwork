import { SmartBuffer } from "smart-buffer";
import { User } from "./Core/User";
import { ToUserMessages, FromUserMessages } from './Messages';
import { Room } from './Core/Room';
export class MyGameUser extends User {
    interval: NodeJS.Timeout;
    onRoomJoined(room: Room) {
        let message = new SmartBuffer();
        message.writeUInt8(ToUserMessages.network_rec_connected);
        message.writeString(`welcome to the room! ${room.roomIdx}`);
        this.sendMessageToUser(message.toBuffer());
        this.interval = setInterval(() => {
            let somemessage = new SmartBuffer();
            somemessage.writeUInt8(ToUserMessages.network_rec_message);
            somemessage.writeString(`Hello there! you are user ${this.id}. you have ${room.users.length-1} users with you `);
            this.sendMessageToUser(somemessage.toBuffer());
        }, 1000)
    }

    onGotMessage(type: number, buffer: SmartBuffer) {
        switch (type) {
            case FromUserMessages.network_send_message:
                console.log(buffer.readString());
                break;
        }
    }

    onClosed() {
        clearInterval(this.interval);
    }
}

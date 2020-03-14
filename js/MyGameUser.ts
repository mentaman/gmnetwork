import { SmartBuffer } from "smart-buffer";
import { User } from "./User";
import { ToUserMessages, FromUserMessages } from './Messages';
export class MyGameUser extends User {
    interval: NodeJS.Timeout;
    onConnected() {
        let message = new SmartBuffer();
        message.writeUInt8(ToUserMessages.network_rec_connected);
        message.writeString("welcome!");
        this.sendMessageToUser(message.toBuffer());
        this.interval = setInterval(() => {
            let somemessage = new SmartBuffer();
            somemessage.writeUInt8(ToUserMessages.network_rec_message);
            somemessage.writeString("Hello there!"+Math.random().toString());
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

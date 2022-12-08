import { eventsEmitter } from "../telegraf/TelegrafBot";
import { IUserDto } from "../users/userDto/UserDto";

class TelegrafService {
    async sendActivation(userData: IUserDto) {
        eventsEmitter.emit('signup', userData);
    }
}

export default new TelegrafService();